import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

async function logoutAndRedirect(req: NextRequest) {
  await destroySession();

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("loggedOut", "1");

  const res = NextResponse.redirect(loginUrl, 303);
  res.cookies.set("skr_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  // Only clear cookies — do not wipe localStorage (language preference etc.)
  res.headers.set("Clear-Site-Data", '"cookies"');
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

export async function POST(req: NextRequest) {
  return logoutAndRedirect(req);
}

export async function GET(req: NextRequest) {
  return logoutAndRedirect(req);
}
