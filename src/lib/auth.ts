import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { Role, UserStatus } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "skr-college-dev-secret-change-in-production-min-32-chars"
);
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

export async function createSession(userId: string, ip?: string, ua?: string) {
  const token = crypto.randomUUID() + "-" + crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await prisma.session.create({
    data: { userId, token, expiresAt, ipAddress: ip, userAgent: ua },
  });

  const jwt = await new SignJWT({ sub: userId, sid: token })
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

  return { token, expiresAt };
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(SESSION_COOKIE)?.value;
  if (!jwt) return null;

  try {
    const { payload } = await jwtVerify(jwt, JWT_SECRET);
    const userId = payload.sub as string;
    const sessionToken = payload.sid as string;

    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        userId,
        expiresAt: { gt: new Date() },
        revokedAt: null,
      },
      include: {
        user: {
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
        },
      },
    });

    if (!session || session.user.status !== UserStatus.ACTIVE) return null;
    return session.user;
  } catch {
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
      await prisma.session.updateMany({
        where: { token: sessionToken },
        data: { revokedAt: new Date() },
      });
    } catch {
      /* ignore */
    }
  }
  cookieStore.delete(SESSION_COOKIE);
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

/** Role hierarchy helpers */
export const ADMIN_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.PRINCIPAL,
  Role.SCHOOL_ADMIN,
];

export const STAFF_ROLES: Role[] = [
  ...ADMIN_ROLES,
  Role.ADMISSION_OFFICER,
  Role.TEACHER,
  Role.EXAM_CONTROLLER,
  Role.ACCOUNTANT,
  Role.LIBRARIAN,
  Role.HR,
  Role.TRANSPORT_MANAGER,
  Role.STAFF,
];

export function canManageStudents(role: Role) {
  return [Role.SUPER_ADMIN, Role.PRINCIPAL, Role.SCHOOL_ADMIN, Role.ADMISSION_OFFICER].includes(role);
}

export function canEnterMarks(role: Role) {
  return [Role.SUPER_ADMIN, Role.PRINCIPAL, Role.SCHOOL_ADMIN, Role.TEACHER, Role.EXAM_CONTROLLER].includes(role);
}

export function canPublishResults(role: Role) {
  return [Role.SUPER_ADMIN, Role.PRINCIPAL, Role.EXAM_CONTROLLER].includes(role);
}

export function canManageFees(role: Role) {
  return [Role.SUPER_ADMIN, Role.PRINCIPAL, Role.SCHOOL_ADMIN, Role.ACCOUNTANT].includes(role);
}
