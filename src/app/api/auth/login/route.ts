import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { UserStatus } from "@prisma/client";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

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

const SESSION_COOKIE = "skr_session";
const SESSION_DAYS = 7;

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

    const hashToCheck =
      user?.passwordHash || "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva";
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

    const session = await createSession(user.id, ip === "unknown" ? undefined : ip, ua, {
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

    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        displayName: user.displayName,
      },
    });

    // Explicit Set-Cookie on the response (fixes session not sticking on Vercel)
    if (session?.jwt) {
      const expiresAt = session.expiresAt ?? new Date(Date.now() + SESSION_DAYS * 86400000);
      res.cookies.set(SESSION_COOKIE, session.jwt, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      });
    }

    return res;
  } catch (err: unknown) {
    console.error("Login error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("JWT_SECRET")) {
      return NextResponse.json({ error: "Server auth misconfigured. Contact admin." }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
