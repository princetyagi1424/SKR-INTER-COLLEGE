import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { UserStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Login rate limiting (in-memory, per server instance).
//
// This is a best-effort guard against brute-force attempts. On serverless
// platforms (e.g. Vercel) each instance has its own memory, so this does not
// provide a hard global guarantee. For a stronger guarantee, back this with
// a shared store (Redis/Upstash) keyed by IP and/or identifier.
// ---------------------------------------------------------------------------
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 8; // per key, per window

type Bucket = { count: number; resetAt: number };
const attempts = new Map<string, Bucket>();

function rateLimitKey(ip: string, identifier: string): string {
  return `${ip}:${identifier}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = attempts.get(key);
  if (!bucket || bucket.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_ATTEMPTS;
}

function recordSuccess(key: string) {
  attempts.delete(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.email || body.phone || "").trim().toLowerCase();
    const password = body.password || "";

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/phone and password are required" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const key = rateLimitKey(ip, identifier);

    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    // Always run a bcrypt compare, even when the user doesn't exist or has no
    // password hash, so that response timing doesn't reveal whether an
    // account exists. A user with no passwordHash can never log in.
    const hashToCheck = user?.passwordHash || "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva";
    const passwordOk = await verifyPassword(password, hashToCheck);

    if (!user || !user.passwordHash || !passwordOk) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.status !== UserStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Account is not active. Contact the school office." },
        { status: 403 }
      );
    }

    recordSuccess(key);

    const ua = req.headers.get("user-agent") || undefined;

    await createSession(user.id, ip === "unknown" ? undefined : ip, ua, {
      email: user.email,
      phone: user.phone,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
    });

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        displayName: user.displayName,
      },
    });
  } catch (err: unknown) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
