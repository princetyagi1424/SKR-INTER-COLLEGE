import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canPublishResults, requireAuth } from "@/lib/auth";
import { gradeFromPercentage, resultFromPercentage } from "@/lib/grades";
import { ExamStatus, MarksStatus } from "@prisma/client";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    if (!canPublishResults(user.role)) {
      return NextResponse.json({ error: "Only principal / exam controller can publish" }, { status: 403 });
    }
    const { id } = await ctx.params;
    const exam = await prisma.exam.findFirst({
      where: { id },
      include: { examSubjects: true },
    });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

    const marks = await prisma.mark.findMany({ where: { examId: id } });
    const byStudent = new Map<string, typeof marks>();
    for (const m of marks) {
      const list = byStudent.get(m.studentId) || [];
      list.push(m);
      byStudent.set(m.studentId, list);
    }

    const passing = exam.passingPercentage ?? 33;
    let cards = 0;
    for (const [studentId, studentMarks] of byStudent) {
      let obtained = 0;
      let maximum = 0;
      let anyMissing = false;
      for (const es of exam.examSubjects) {
        const mark = studentMarks.find((m) => m.subjectId === es.subjectId);
        const max = es.maxTheory + es.maxPractical + es.maxInternal;
        if (!mark) {
          anyMissing = true;
          continue;
        }
        if (mark.isExempted) continue;
        maximum += max;
        if (mark.isAbsent) continue;
        if (mark.totalMarks == null) {
          anyMissing = true;
          continue;
        }
        obtained += mark.totalMarks;
      }
      const pct = maximum > 0 ? (obtained / maximum) * 100 : null;
      const resultStatus = anyMissing && pct == null ? "INCOMPLETE" : resultFromPercentage(pct, passing);
      const prev = await prisma.reportCard.findFirst({
        where: { examId: id, studentId, isCurrent: true },
        orderBy: { version: "desc" },
      });
      const version = (prev?.version ?? 0) + 1;
      if (prev) {
        await prisma.reportCard.update({ where: { id: prev.id }, data: { isCurrent: false } });
      }
      await prisma.reportCard.create({
        data: {
          examId: id,
          studentId,
          version,
          totalObtained: obtained,
          totalMaximum: maximum,
          percentage: pct,
          overallGrade: gradeFromPercentage(pct),
          resultStatus,
          publishedAt: new Date(),
          isCurrent: true,
          supersededById: null,
        },
      });
      cards += 1;
    }

    await prisma.mark.updateMany({
      where: { examId: id },
      data: { status: MarksStatus.PUBLISHED, approvedById: user.id, approvedAt: new Date() },
    });
    await prisma.exam.update({
      where: { id },
      data: { status: ExamStatus.PUBLISHED, approvedById: user.id, publishedAt: new Date(), publishDate: new Date() },
    });

    return NextResponse.json({ ok: true, reportCards: cards });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Publish failed" }, { status: 500 });
  }
}
