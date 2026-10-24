import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, requireAuth } from "@/lib/auth";
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
    if (!canEnterMarks(user.role) && user.role !== Role.TEACHER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (!classId) {
      const classes = await prisma.class.findMany({ where: { isActive: true }, include: { sections: true }, orderBy: { numericLevel: "asc" } });
      return NextResponse.json({ classes });
    }
    const date = new Date(dateStr + "T00:00:00.000Z");
    const enrollments = await prisma.enrollment.findMany({
      where: { classId, status: "ENROLLED" },
      include: { student: true, section: true },
      orderBy: { rollNumber: "asc" },
    });
    const existing = await prisma.attendance.findMany({
      where: { date, studentId: { in: enrollments.map((e) => e.studentId) } },
    });
    return NextResponse.json({ date: dateStr, enrollments, existing });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
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
    const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
    if (!session) return NextResponse.json({ error: "No academic session" }, { status: 400 });
    let saved = 0;
    for (const r of records) {
      const studentId = String(r.studentId || "");
      const sectionId = String(r.sectionId || "");
      const status = (Object.values(AttendanceStatus) as string[]).includes(r.status) ? r.status : "PRESENT";
      if (!studentId || !sectionId) continue;
      const existing = await prisma.attendance.findFirst({ where: { studentId, date } });
      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: { status, sectionId, modifiedById: user.id },
        });
      } else {
        await prisma.attendance.create({
          data: { studentId, sectionId, academicSessionId: session.id, date, status, recordedById: user.id },
        });
      }
      saved += 1;
    }
    return NextResponse.json({ saved });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Attendance save failed" }, { status: 500 });
  }
}
