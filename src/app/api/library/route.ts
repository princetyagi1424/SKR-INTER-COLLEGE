import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth, ADMIN_ROLES } from "@/lib/auth";
import { Role } from "@prisma/client";

function canManage(role: Role) {
  return ADMIN_ROLES.includes(role) || role === Role.LIBRARIAN;
}

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const q = (req.nextUrl.searchParams.get("q") || "").trim();
    const books = await prisma.libraryBook.findMany({
      where: q
        ? { isActive: true, OR: [{ title: { contains: q } }, { author: { contains: q } }] }
        : { isActive: true },
      orderBy: { title: "asc" },
      take: 100,
    });
    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findFirst({ where: { userId: user.id } });
      const issues = student
        ? await prisma.libraryIssue.findMany({ where: { studentId: student.id }, include: { book: true }, orderBy: { issuedAt: "desc" }, take: 30 })
        : [];
      return NextResponse.json({ books, issues });
    }
    const issues = canManage(user.role)
      ? await prisma.libraryIssue.findMany({ where: { status: "ISSUED" }, include: { book: true, student: true }, orderBy: { dueDate: "asc" }, take: 100 })
      : [];
    return NextResponse.json({ books, issues });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Library load failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canManage(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    if (body.action === "add") {
      const title = String(body.title || "").trim();
      const copies = Math.max(1, Number(body.totalCopies || 1));
      if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
      const book = await prisma.libraryBook.create({
        data: {
          title,
          author: body.author ? String(body.author) : null,
          isbn: body.isbn ? String(body.isbn) : null,
          category: body.category ? String(body.category) : null,
          totalCopies: copies,
          availableCopies: copies,
          shelfLocation: body.shelfLocation ? String(body.shelfLocation) : null,
        },
      });
      return NextResponse.json({ book });
    }
    if (body.action === "issue") {
      const bookId = String(body.bookId || "");
      const admissionNumber = String(body.admissionNumber || "").trim();
      const days = Math.min(60, Math.max(1, Number(body.days || 14)));
      const book = await prisma.libraryBook.findFirst({ where: { id: bookId, isActive: true } });
      if (!book || book.availableCopies < 1) return NextResponse.json({ error: "No copies available" }, { status: 409 });
      const student = await prisma.student.findFirst({ where: { admissionNumber } });
      if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
      const due = new Date();
      due.setDate(due.getDate() + days);
      const issue = await prisma.libraryIssue.create({
        data: { bookId, studentId: student.id, dueDate: due, status: "ISSUED" },
      });
      await prisma.libraryBook.update({ where: { id: bookId }, data: { availableCopies: book.availableCopies - 1 } });
      return NextResponse.json({ issue });
    }
    if (body.action === "return") {
      const issueId = String(body.issueId || "");
      const issue = await prisma.libraryIssue.findFirst({ where: { id: issueId, status: "ISSUED" }, include: { book: true } });
      if (!issue) return NextResponse.json({ error: "Open issue not found" }, { status: 404 });
      const lateDays = Math.max(0, Math.ceil((Date.now() - issue.dueDate.getTime()) / 86400000));
      const fine = lateDays * 2;
      await prisma.libraryIssue.update({
        where: { id: issueId },
        data: { status: "RETURNED", returnedAt: new Date(), fineAmount: fine },
      });
      await prisma.libraryBook.update({
        where: { id: issue.bookId },
        data: { availableCopies: issue.book.availableCopies + 1 },
      });
      return NextResponse.json({ ok: true, fine });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Library action failed" }, { status: 500 });
  }
}
