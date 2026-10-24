import { Role } from "@prisma/client";
import { prisma } from "./prisma";
import { STAFF_ROLES } from "./auth";

export async function canViewStudentRecord(user: { id: string; role: Role }, studentId: string) {
  if (STAFF_ROLES.includes(user.role)) return true;
  if (user.role === Role.STUDENT) {
    const s = await prisma.student.findFirst({ where: { id: studentId, userId: user.id }, select: { id: true } });
    return !!s;
  }
  if (user.role === Role.PARENT) {
    const parent = await prisma.parent.findFirst({ where: { userId: user.id }, select: { id: true } });
    if (!parent) return false;
    const link = await prisma.studentGuardian.findFirst({
      where: { parentId: parent.id, studentId },
      select: { id: true },
    });
    return !!link;
  }
  return false;
}
