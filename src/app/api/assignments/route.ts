import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, requireAuth } from "@/lib/auth";
import { AssignmentStatus, Role } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireAuth();
    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findFirst({
        where: { userId: user.id },
        include: { enrollments: { where: { status: "ENROLLED" }, take: 1 } },
      });
      const classId = student?.enrollments[0]?.classId;
      if (!classId) return NextResponse.json({ assignments: [] });
      const assignments = await prisma.assignment.findMany({
        where: { classId, status: AssignmentStatus.PUBLISHED },
        orderBy: { createdAt: "desc" },
        include: { submissions: { where: { studentId: student!.id } } },
      });
      return NextResponse.json({ assignments });
    }
    const userOk = canEnterMarks(user.role);
    if (!userOk) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const assignments = await prisma.assignment.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { class: true } });
    const classes = await prisma.class.findMany({ where: { isActive: true }, orderBy: { numericLevel: "asc" } });
    return NextResponse.json({ assignments, classes });
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
    const title = String(body.title || "").trim();
    const classId = String(body.classId || "");
    if (!title || !classId) return NextResponse.json({ error: "Title and class required" }, { status: 400 });
    const staff = await prisma.staff.findFirst({ where: { userId: user.id } });
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: body.description ? String(body.description) : null,
        classId,
        teacherId: staff?.id,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        status: AssignmentStatus.PUBLISHED,
      },
    });
    return NextResponse.json({ assignment });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
