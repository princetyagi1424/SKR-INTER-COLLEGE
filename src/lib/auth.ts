import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { Role, UserStatus } from "@prisma/client";

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
const SESSION_COOKIE = "skr_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  id: string;
  email: string | null;
  phone: string | null;
  role: Role;
  firstName: string;
  lastName: string | null;
  displayName: string | null;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(
  userId: string,
  ip?: string,
  ua?: string,
  userClaims?: {
    email: string | null;
    phone: string | null;
    role: Role;
    firstName: string;
    lastName: string | null;
    displayName: string | null;
  }
) {
  const token = crypto.randomUUID() + "-" + crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await prisma.session.create({
    data: { userId, token, expiresAt, ipAddress: ip, userAgent: ua },
  });

  const jwt = await new SignJWT({
    sub: userId,
    sid: token,
    role: userClaims?.role,
    email: userClaims?.email ?? undefined,
    phone: userClaims?.phone ?? undefined,
    firstName: userClaims?.firstName,
    lastName: userClaims?.lastName ?? undefined,
    displayName: userClaims?.displayName ?? undefined,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_DAYS}d`)
    .setIssuedAt()
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { token, expiresAt, jwt };
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(SESSION_COOKIE)?.value;
  if (!jwt) return null;

  try {
    const { payload } = await jwtVerify(jwt, JWT_SECRET);
    const userId = payload.sub as string;
    if (!userId) return null;

    const sessionToken = payload.sid as string;
    if (!sessionToken) return null;

    let session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) return null;
    if (session.revokedAt) return null;

    const uid = session.userId || userId;
    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        firstName: true,
        lastName: true,
        displayName: true,
        status: true,
      },
    });

    if (!user) return null;
    if (user.status !== UserStatus.ACTIVE) return null;

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
    };
  } catch (err) {
    console.error("[getSession] error:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(SESSION_COOKIE)?.value;
  if (jwt) {
    try {
      const { payload } = await jwtVerify(jwt, JWT_SECRET);
      const sessionToken = payload.sid as string;
      if (sessionToken) {
        await prisma.session.updateMany({
          where: { token: sessionToken },
          data: { revokedAt: new Date() },
        });
      }
    } catch {
      /* ignore */
    }
  }
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  try {
    cookieStore.delete(SESSION_COOKIE);
  } catch {
    /* ignore */
  }
}

export async function requireAuth(allowedRoles?: Role[]): Promise<SessionUser> {
  const user = await getSession();
  if (!user) throw new AuthError("Unauthorized", 401);
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new AuthError("Forbidden", 403);
  }
  return user;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const ADMIN_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.PRINCIPAL,
  Role.SCHOOL_ADMIN,
];

export const STAFF_ROLES: Role[] = [
  ...ADMIN_ROLES,
  Role.ADMISSION_OFFICER,
  Role.EXAM_CONTROLLER,
  Role.ACCOUNTANT,
  Role.LIBRARIAN,
  Role.HR,
  Role.TRANSPORT_MANAGER,
  Role.STAFF,
];

export const EMPLOYEE_ROLES: Role[] = [
  ...STAFF_ROLES,
  Role.TEACHER,
];

export function canManageStudents(role: Role): boolean {
  const allowed: Role[] = [
    Role.SUPER_ADMIN,
    Role.PRINCIPAL,
    Role.SCHOOL_ADMIN,
    Role.ADMISSION_OFFICER,
  ];
  return allowed.includes(role);
}

export function canEnterMarks(role: Role): boolean {
  const allowed: Role[] = [
    Role.SUPER_ADMIN,
    Role.PRINCIPAL,
    Role.SCHOOL_ADMIN,
    Role.TEACHER,
    Role.EXAM_CONTROLLER,
  ];
  return allowed.includes(role);
}

export function canPublishResults(role: Role): boolean {
  const allowed: Role[] = [
    Role.SUPER_ADMIN,
    Role.PRINCIPAL,
    Role.EXAM_CONTROLLER,
  ];
  return allowed.includes(role);
}

export function canManageFees(role: Role): boolean {
  const allowed: Role[] = [
    Role.SUPER_ADMIN,
    Role.PRINCIPAL,
    Role.SCHOOL_ADMIN,
    Role.ACCOUNTANT,
  ];
  return allowed.includes(role);
}
