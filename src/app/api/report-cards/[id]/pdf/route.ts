import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth } from "@/lib/auth";
import { canViewStudentRecord } from "@/lib/report-access";

export const runtime = "nodejs";

function toPdf(draw: (doc: InstanceType<typeof PDFDocument>) => void): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 42 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    draw(doc);
    doc.end();
  });
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;
    const card = await prisma.reportCard.findFirst({
      where: { id },
      include: {
        exam: { include: { class: true, examSubjects: { include: { subject: true } } } },
        student: true,
      },
    });
    if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (card.exam.status !== "PUBLISHED" && !["SUPER_ADMIN", "PRINCIPAL", "EXAM_CONTROLLER", "SCHOOL_ADMIN"].includes(user.role)) {
      return NextResponse.json({ error: "Result is not published" }, { status: 403 });
    }
    const allowed = await canViewStudentRecord(user, card.studentId);
    if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const marks = await prisma.mark.findMany({ where: { examId: card.examId, studentId: card.studentId } });
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId: card.studentId, classId: card.exam.classId },
      include: { section: true },
    });

    const pdf = await toPdf((doc) => {
      doc.fontSize(16).text("S.K.R. INTER COLLEGE & PVT ITI", { align: "center" });
      doc.fontSize(10).text("Udaypur Khalsa, Bah, Pinahat, Agra — 283113", { align: "center" });
      doc.moveDown(0.4);
      doc.fontSize(13).text("REPORT CARD", { align: "center" });
      doc.moveDown(0.6);
      doc.fontSize(11);
      doc.text(`Examination: ${card.exam.name} (${card.exam.examType})`);
      doc.text(`Student: ${card.student.firstName} ${card.student.lastName || ""}`);
      doc.text(`Admission No: ${card.student.admissionNumber}`);
      doc.text(`Class: ${card.exam.class.name}${enrollment?.section ? "-" + enrollment.section.name : ""}   Roll: ${enrollment?.rollNumber || "—"}`);
      doc.text(`Card ID: ${card.id}   Version: ${card.version}`);
      doc.moveDown(0.6);
      doc.fontSize(10).text("Subject                         Max     Obtained     Grade");
      doc.moveDown(0.2);
      for (const es of card.exam.examSubjects) {
        const m = marks.find((x) => x.subjectId === es.subjectId);
        const max = es.maxTheory + es.maxPractical + es.maxInternal;
        const obt = m?.isAbsent ? "AB" : m?.isExempted ? "EX" : m?.totalMarks == null ? "—" : String(m.totalMarks);
        const grade = m?.grade || "—";
        doc.text(`${es.subject.name.padEnd(28, " ").slice(0, 28)}  ${String(max).padStart(4)}    ${String(obt).padStart(8)}    ${grade}`);
      }
      doc.moveDown(0.8);
      doc.fontSize(12).text(
        `Total: ${card.totalObtained ?? "—"} / ${card.totalMaximum ?? "—"}    Percentage: ${card.percentage != null ? card.percentage.toFixed(2) : "—"}%    Grade: ${card.overallGrade || "—"}    Result: ${card.resultStatus || "—"}`
      );
      doc.moveDown(1);
      doc.fontSize(9).text("This card is valid only after authorised publication by the school. Signatures and stamps are applied on the printed office copy.");
      doc.text(`Issued: ${card.publishedAt ? card.publishedAt.toISOString().slice(0, 10) : "—"}`);
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="report-${card.student.admissionNumber}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "PDF failed" }, { status: 500 });
  }
}
