import { prisma } from "./prisma";

/**
 * Shared data-isolation helpers.
 *
 * These exist because several API routes previously granted broad access by
 * role alone (e.g. "any TEACHER can mark attendance") instead of checking
 * the specific class/subject/child a given user is actually tied to. Centralizing
 * the checks here means every route enforces the same rule.
 */

/**
 * Returns the ids of students linked to this parent's user account
 * (via StudentGuardian -> Parent -> User), for use in "parents may only see
 * their own linked children" checks. Returns an empty array if the user has
 * no Parent profile or no linked children.
 */
export async function getLinkedStudentIds(parentUserId: string): Promise<string[]> {
  const parent = await prisma.parent.findFirst({
    where: { userId: parentUserId },
    include: { children: { select: { studentId: true } } },
  });
  if (!parent) return [];
  return parent.children.map((c) => c.studentId);
}

/**
 * Returns true if the given user (expected to hold the TEACHER role) is
 * assigned, via TeacherSubject, to the given class. A TeacherSubject row
 * with a null classId is treated as "not scoped to a specific class" and
 * does NOT grant access here — class-wide operations (marking a whole
 * class's attendance, entering marks for a class) require an explicit
 * class-scoped assignment.
 */
export async function isTeacherAssignedToClass(
  teacherUserId: string,
  classId: string
): Promise<boolean> {
  const staff = await prisma.staff.findFirst({ where: { userId: teacherUserId } });
  if (!staff) return false;
  const assignment = await prisma.teacherSubject.findFirst({
    where: { staffId: staff.id, classId },
  });
  return !!assignment;
}

/**
 * Returns true if the given user (expected to hold the TEACHER role) is
 * assigned, via TeacherSubject, to the given subject within the given class.
 */
export async function isTeacherAssignedToSubject(
  teacherUserId: string,
  classId: string,
  subjectId: string
): Promise<boolean> {
  const staff = await prisma.staff.findFirst({ where: { userId: teacherUserId } });
  if (!staff) return false;
  const assignment = await prisma.teacherSubject.findFirst({
    where: { staffId: staff.id, classId, subjectId },
  });
  return !!assignment;
}
