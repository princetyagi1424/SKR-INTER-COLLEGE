import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    new URL("/icons/icon-512.png", "https://skr-inter-college.vercel.app"),
    302
  );
}
