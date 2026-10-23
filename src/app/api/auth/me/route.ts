import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSession();
  if (user) return NextResponse.json({ user });

  // Diagnostics (safe — no secrets)
  const cookieStore = await cookies();
  const hasCookie = !!cookieStore.get("skr_session")?.value;
  const headerCookie = req.headers.get("cookie") || "";
  const headerHasSession = headerCookie.includes("skr_session=");

  return NextResponse.json(
    {
      error: "Unauthorized",
      debug: {
        hasCookieFromCookiesAPI: hasCookie,
        hasCookieFromHeader: headerHasSession,
        nodeEnv: process.env.NODE_ENV,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasDbUrl: !!process.env.DATABASE_URL,
      },
    },
    { status: 401 }
  );
}
