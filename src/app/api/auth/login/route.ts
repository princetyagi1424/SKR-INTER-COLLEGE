import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { UserStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.email || body.phone || "").trim().toLowerCase();
    const password = body.password || "";

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/phone and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.status !== UserStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Account is not active. Contact the school office." },
        { status: 403 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined;
    const ua = req.headers.get("user-agent") || undefined;

    await createSession(user.id, ip, ua, {
      email: user.email,
      phone: user.phone,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "LOGIN",
          entityType: "User",
          entityId: user.id,
          ipAddress: ip,
        },
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
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("database") ||
      msg.includes("DNS") ||
      msg.includes("PrismaClientInitializationError") ||
      msg.includes("Can't reach") ||
      msg.includes("connection") ||
      msg.includes("Server selection timeout")
    ) {
      return NextResponse.json(
        {
          error:
            "Database connection failed. Please check MongoDB Atlas Network Access (allow 0.0.0.0/0) and DATABASE_URL.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
