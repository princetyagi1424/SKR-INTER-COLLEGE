import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { Role, UserStatus } from "@prisma/client";

/**
 * Emergency admin bootstrap / password reset.
 * POST /api/auth/bootstrap-admin
 * Header: x-bootstrap-secret: <BOOTSTRAP_SECRET or JWT_SECRET>
 * Body: { "email"?: string, "password"?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-bootstrap-secret") || "";
    const expected = process.env.BOOTSTRAP_SECRET || process.env.JWT_SECRET || "";

    if (!expected || secret.length < 16 || secret !== expected) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const email = String(
      body.email || process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@skrcollege.local"
    )
      .trim()
      .toLowerCase();
    const password = String(
      body.password || process.env.BOOTSTRAP_ADMIN_PASSWORD || "ChangeMeImmediately123!"
    );

    if (password.length < 8) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
        role: Role.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        firstName: "Super",
        lastName: "Admin",
        displayName: "Super Admin",
      },
      create: {
        email,
        passwordHash,
        role: Role.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        firstName: "Super",
        lastName: "Admin",
        displayName: "Super Admin",
        emailVerifiedAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      email: user.email,
      role: user.role,
      message: "Admin password reset. Login with the provided credentials.",
    });
  } catch (err: unknown) {
    console.error("bootstrap-admin error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
