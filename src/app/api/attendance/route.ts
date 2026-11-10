import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, requireAuth } from "@/lib/auth";
import { getLinkedStudentIds, isTeacherAssignedToClass } from "@/lib/access-control";
import { AttendanceStatus, Role } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const classId = req.nextUrl.searchParams.get("classId");
    const dateStr = req.nextUrl.searchParams.get("date") || new Date().toISOString().slice(0, 10);

    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findFirst({ where: { userId: user.id } });
      if (!student) return NextResponse.json({ rows: [] });
      const rows = await prisma.attendance.findMany({ where: { studentId: student.id }, orderBy: { date: "desc" }, take: 60 });
      return NextResponse.json({ rows });
    }

    if (user.role === Role.PARENT) {
      const linkedStudentIds = await getLinkedStudentIds(user.id);
      const studentId = req.nextUrl.searchParams.get("studentId");
      if (linkedStudentIds.length === 0) return NextResponse.json({ children: [], rows: [] });
      if (!studentId) {
        // No specific child selected: list the linked children so the UI can
        // let the parent pick one.
        const children = await prisma.student.findMany({
          where: { id: { in: linkedStudentIds } },
          select: { id: true, firstName: true, lastName: true, admissionNumber: true },
        });
        return NextResponse.json({ children, rows: [] });
      }
      if (!linkedStudentIds.includes(studentId)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const rows = await prisma.attendance.findMany({ where: { studentId }, orderBy: { date: "desc" }, take: 60 });
      return NextResponse.json({ rows });
    }

    if (!canEnterMarks(user.role) && user.role !== Role.TEACHER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!classId) {
      const classes = await prisma.class.findMany({ where: { isActive: true }, include: { sections: true }, orderBy: { numericLevel: "asc" } });
      return NextResponse.json({ classes });
    }

    // A plain TEACHER (not an admin-tier role) may only load/mark
    // attendance for a class they are actually assigned to teach.
    if (user.role === Role.TEACHER) {
      const assigned = await isTeacherAssignedToClass(user.id, classId);
      if (!assigned) return NextResponse.json({ error: "You are not assigned to this class" }, { status: 403 });
    }

    const date = new Date(dateStr + "T00:00:00.000Z");
    const enrollments = await prisma.enrollment.findMany({
      where: { classId, status: "ENROLLED" },
      include: { student: true, section: true },
      orderBy: { rollNumber: "asc" },
    });
    const existing = await prisma.attendance.findMany({
      where: { date, studentId: { in: enrollments.map((e: { studentId: string }) => e.studentId) } },
    });
    return NextResponse.json({ date: dateStr, enrollments, existing });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const date = new Date(String(body.date || new Date().toISOString().slice(0, 10)) + "T00:00:00.000Z");
    const records = Array.isArray(body.records) ? body.records : [];
    const classId = String(body.classId || "");

    // A plain TEACHER may only submit attendance for a class they are
    // assigned to. Admin-tier roles (SUPER_ADMIN, PRINCIPAL, SCHOOL_ADMIN,
    // EXAM_CONTROLLER) are not restricted this way.
    if (user.role === Role.TEACHER) {
      if (!classId) return NextResponse.json({ error: "classId is required" }, { status: 400 });
      const assigned = await isTeacherAssignedToClass(user.id, classId);
      if (!assigned) return NextResponse.json({ error: "You are not assigned to this class" }, { status: 403 });
    }

    const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
    if (!session) return NextResponse.json({ error: "No academic session" }, { status: 400 });

    let saved = 0;
    for (const r of records) {
      const studentId = String(r.studentId || "");
      const sectionId = String(r.sectionId || "");
      const status = (Object.values(AttendanceStatus) as string[]).includes(r.status) ? r.status : "PRESENT";
      if (!studentId || !sectionId) continue;

      // Defense in depth: even if the per-request classId check above
      // passed, make sure every individual record actually belongs to a
      // student currently enrolled in that class before writing it.
      if (classId) {
        const enrolled = await prisma.enrollment.findFirst({
          where: { studentId, classId, status: "ENROLLED" },
        });
        if (!enrolled) continue;
      }

      const existing = await prisma.attendance.findFirst({ where: { studentId, date } });
      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: { status, sectionId, modifiedById: user.id },
        });
      } else {
        await prisma.attendance.create({
          data: {
            studentId,
            sectionId,
            date,
            status,
            academicSessionId: session.id,
            recordedById: user.id,
          },
        });
      }
      saved += 1;
    }
    return NextResponse.json({ saved });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}
