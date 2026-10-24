import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, requireAuth } from "@/lib/auth";
import { gradeFromPercentage } from "@/lib/grades";
import { MarksStatus } from "@prisma/client";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await ctx.params;
    const exam = await prisma.exam.findFirst({
      where: { id },
      include: { class: true, examSubjects: { include: { subject: true } } },
    });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

    const enrollments = await prisma.enrollment.findMany({
      where: { classId: exam.classId, status: "ENROLLED" },
      include: { student: true, section: true },
      orderBy: { rollNumber: "asc" },
    });
    const marks = await prisma.mark.findMany({ where: { examId: exam.id } });
    return NextResponse.json({ exam, enrollments, marks });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Failed to load marks" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await ctx.params;
    const exam = await prisma.exam.findFirst({
      where: { id },
      include: { examSubjects: true },
    });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    if (exam.status === "PUBLISHED" || exam.status === "ARCHIVED") {
      return NextResponse.json({ error: "Published exam is locked. Use a correction with a reason." }, { status: 409 });
    }

    const body = await req.json();
    const rows = Array.isArray(body.marks) ? body.marks : [];
    const subjectMap = new Map(exam.examSubjects.map((s) => [s.subjectId, s]));
    let saved = 0;
    const errors: string[] = [];

    for (const row of rows) {
      const studentId = String(row.studentId || "");
      const subjectId = String(row.subjectId || "");
      const es = subjectMap.get(subjectId);
      if (!studentId || !es) {
        errors.push("Invalid student or subject");
        continue;
      }
      const absent = !!row.isAbsent;
      const exempt = !!row.isExempted;
      const theory = row.theoryMarks === "" || row.theoryMarks == null ? null : Number(row.theoryMarks);
      const practical = row.practicalMarks === "" || row.practicalMarks == null ? null : Number(row.practicalMarks);
      if (theory != null && (Number.isNaN(theory) || theory < 0 || theory > es.maxTheory)) {
        errors.push(`Theory out of range for subject ${subjectId}`);
        continue;
      }
      if (practical != null && (Number.isNaN(practical) || practical < 0 || practical > es.maxPractical)) {
        errors.push(`Practical out of range for subject ${subjectId}`);
        continue;
      }
      const total = absent || exempt ? null : (theory ?? 0) + (practical ?? 0);
      const max = es.maxTheory + es.maxPractical + es.maxInternal;
      const pct = total == null || max <= 0 ? null : (total / max) * 100;
      const existing = await prisma.mark.findFirst({ where: { examId: id, studentId, subjectId } });
      const data = {
        theoryMarks: absent || exempt ? null : theory,
        practicalMarks: absent || exempt ? null : practical,
        totalMarks: total,
        grade: absent ? "AB" : exempt ? "EX" : gradeFromPercentage(pct),
        isAbsent: absent,
        isExempted: exempt,
        status: MarksStatus.DRAFT,
        enteredById: user.id,
      };
      if (existing) {
        await prisma.mark.update({ where: { id: existing.id }, data });
      } else {
        await prisma.mark.create({ data: { examId: id, studentId, subjectId, ...data } });
      }
      saved += 1;
    }
    return NextResponse.json({ saved, errors });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Could not save marks" }, { status: 500 });
  }
}
