import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getSession();
  if (user) return NextResponse.json({ user });

  const cookieStore = await cookies();
  const token = cookieStore.get("skr_session")?.value;
  const headerCookie = req.headers.get("cookie") || "";
  const headerHasSession = headerCookie.includes("skr_session=");

  let jwtOk = false;
  let hasSid = false;
  let sessionFound = false;
  let jwtError: string | null = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (secret && secret.length >= 32) {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        jwtOk = true;
        hasSid = typeof payload.sid === "string" && !!payload.sid;
        if (hasSid && payload.sub) {
          const row = await prisma.session.findFirst({
            where: {
              token: payload.sid as string,
              userId: payload.sub as string,
              expiresAt: { gt: new Date() },
            },
          });
          sessionFound = !!row && !row.revokedAt;
        }
      } else {
        jwtError = "JWT_SECRET missing or too short";
      }
    } catch (e: unknown) {
      jwtError = e instanceof Error ? e.message.slice(0, 120) : "verify failed";
    }
  }

  return NextResponse.json(
    {
      error: "Unauthorized",
      debug: {
        hasCookieFromCookiesAPI: !!token,
        hasCookieFromHeader: headerHasSession,
        nodeEnv: process.env.NODE_ENV,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasDbUrl: !!process.env.DATABASE_URL,
        jwtOk,
        hasSid,
        sessionFound,
        jwtError,
      },
    },
    { status: 401 }
  );
}
