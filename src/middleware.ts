import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function resolveJwtSecret(): Uint8Array {
  const configured = process.env.JWT_SECRET;
  if (configured && configured.length >= 32) {
    return new TextEncoder().encode(configured);
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET is not set (or is shorter than 32 characters). Set a strong, random JWT_SECRET in the production environment before starting the app."
    );
  }
  return new TextEncoder().encode("skr-college-local-dev-only-not-for-production-min-32-chars");
}

const JWT_SECRET = resolveJwtSecret();

const STAFF = new Set([
  "SUPER_ADMIN",
  "PRINCIPAL",
  "SCHOOL_ADMIN",
  "ADMISSION_OFFICER",
  "EXAM_CONTROLLER",
  "ACCOUNTANT",
  "HR",
  "LIBRARIAN",
  "TRANSPORT_MANAGER",
  "STAFF",
]);

function homeForRole(role: string): string {
  if (STAFF.has(role)) return "/admin/dashboard";
  if (role === "TEACHER") return "/teacher/dashboard";
  if (role === "STUDENT") return "/student/dashboard";
  if (role === "PARENT") return "/parent/dashboard";
  return "/login";
}

async function readRole(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("skr_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return typeof payload.role === "string" ? payload.role : null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isTeacher = pathname.startsWith("/teacher");
  const isStudent = pathname.startsWith("/student");
  const isParent = pathname.startsWith("/parent");
  const isPortal = isAdmin || isTeacher || isStudent || isParent;

  if (!isPortal) return NextResponse.next();

  const role = await readRole(req);

  if (!role) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    const res = NextResponse.redirect(url);
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  if (isAdmin && !STAFF.has(role)) {
    return NextResponse.redirect(new URL(homeForRole(role), req.url));
  }
  if (isTeacher && role !== "TEACHER") {
    return NextResponse.redirect(new URL(homeForRole(role), req.url));
  }
  if (isStudent && role !== "STUDENT") {
    return NextResponse.redirect(new URL(homeForRole(role), req.url));
  }
  if (isParent && role !== "PARENT") {
    return NextResponse.redirect(new URL(homeForRole(role), req.url));
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*", "/parent/:path*"],
};
