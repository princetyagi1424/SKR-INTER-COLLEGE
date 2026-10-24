import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, canPublishResults, requireAuth } from "@/lib/auth";
import { ExamStatus } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role) && !canPublishResults(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const [exams, classes] = await Promise.all([
      prisma.exam.findMany({
        orderBy: { createdAt: "desc" },
        include: { class: true, examSubjects: { include: { subject: true } }, _count: { select: { marks: true, reportCards: true } } },
        take: 50,
      }),
      prisma.class.findMany({
        where: { isActive: true },
        orderBy: { numericLevel: "asc" },
        include: { subjects: true, sections: true },
      }),
    ]);
    return NextResponse.json({ exams, classes });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Failed to load exams" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const name = String(body.name || "").trim();
    const examType = String(body.examType || "UNIT").trim();
    const classId = String(body.classId || "").trim();
    const passingPercentage = Number(body.passingPercentage ?? 33);
    if (!name || !classId) return NextResponse.json({ error: "Name and class are required" }, { status: 400 });

    const cls = await prisma.class.findFirst({ where: { id: classId }, include: { subjects: true } });
    if (!cls) return NextResponse.json({ error: "Class not found" }, { status: 404 });

    const exam = await prisma.exam.create({
      data: {
        name,
        examType,
        academicSessionId: cls.academicSessionId,
        classId,
        status: ExamStatus.MARKS_ENTRY,
        passingPercentage: Number.isFinite(passingPercentage) ? passingPercentage : 33,
        createdById: user.id,
        examSubjects: {
          create: cls.subjects.map((s) => ({
            subjectId: s.id,
            maxTheory: s.maxTheory ?? 100,
            maxPractical: s.maxPractical ?? 0,
            maxInternal: 0,
            passingMarks: Math.round(((s.maxTheory ?? 100) + (s.maxPractical ?? 0)) * 0.33),
          })),
        },
      },
      include: { examSubjects: true },
    });
    return NextResponse.json({ exam });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Could not create exam" }, { status: 500 });
  }
}
