import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canEnterMarks, requireAuth } from "@/lib/auth";
import { ExamStatus, MarksStatus } from "@prisma/client";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    if (!canEnterMarks(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id } = await ctx.params;
    const exam = await prisma.exam.findFirst({ where: { id } });
    if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    if (exam.status === "PUBLISHED") return NextResponse.json({ error: "Already published" }, { status: 409 });
    await prisma.mark.updateMany({
      where: { examId: id, status: MarksStatus.DRAFT },
      data: { status: MarksStatus.SUBMITTED, submittedAt: new Date() },
    });
    await prisma.exam.update({ where: { id }, data: { status: ExamStatus.UNDER_REVIEW } });
    return NextResponse.json({ ok: true, submittedBy: user.id });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  }
}
