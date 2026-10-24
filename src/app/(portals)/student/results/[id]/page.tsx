import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canViewStudentRecord } from "@/lib/report-access";

export default async function StudentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) redirect("/login");
  const { id } = await params;
  const card = await prisma.reportCard.findFirst({
    where: { id },
    include: { exam: { include: { class: true, examSubjects: { include: { subject: true } } } }, student: true },
  });
  if (!card) notFound();
  const allowed = await canViewStudentRecord(user, card.studentId);
  if (!allowed) redirect("/login");
  if (card.exam.status !== "PUBLISHED" && user.role === "STUDENT") {
    return <p className="p-8 text-sm">This result is not published yet.</p>;
  }
  const marks = await prisma.mark.findMany({ where: { examId: card.examId, studentId: card.studentId } });
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3">
        <Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-bold">{card.exam.name}</h1>
        <p className="mb-4 text-sm text-slate-500">{card.student.firstName} {card.student.lastName} · {card.student.admissionNumber} · {card.exam.class.name}</p>
        <table className="mb-4 w-full rounded-xl border bg-white text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr><th className="px-3 py-2">Subject</th><th className="px-3 py-2">Max</th><th className="px-3 py-2">Obtained</th><th className="px-3 py-2">Grade</th></tr>
          </thead>
          <tbody>
            {card.exam.examSubjects.map((es) => {
              const m = marks.find((x) => x.subjectId === es.subjectId);
              const max = es.maxTheory + es.maxPractical + es.maxInternal;
              const obt = m?.isAbsent ? "AB" : m?.isExempted ? "EX" : m?.totalMarks ?? "—";
              return (
                <tr key={es.id} className="border-t">
                  <td className="px-3 py-2">{es.subject.name}</td>
                  <td className="px-3 py-2">{max}</td>
                  <td className="px-3 py-2">{String(obt)}</td>
                  <td className="px-3 py-2">{m?.grade || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mb-4 text-sm">Total {card.totalObtained ?? "—"} / {card.totalMaximum ?? "—"} · {card.percentage != null ? card.percentage.toFixed(2) : "—"}% · {card.overallGrade} · {card.resultStatus}</p>
        <a href={`/api/report-cards/${card.id}/pdf`} className="inline-block rounded bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white">Download PDF</a>
      </main>
    </div>
  );
}
