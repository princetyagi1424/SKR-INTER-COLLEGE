import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canManageFees, requireAuth } from "@/lib/auth";
import { FeeStatus, PaymentMethod, PaymentStatus } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireAuth();
    if (!canManageFees(user.role) && user.role !== "STUDENT" && user.role !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (user.role === "STUDENT") {
      const student = await prisma.student.findFirst({ where: { userId: user.id } });
      if (!student) return NextResponse.json({ invoices: [] });
      const invoices = await prisma.feeInvoice.findMany({ where: { studentId: student.id }, include: { payments: true }, orderBy: { issuedAt: "desc" } });
      return NextResponse.json({ invoices });
    }
    if (user.role === "PARENT") {
      const parent = await prisma.parent.findFirst({ where: { userId: user.id }, include: { children: true } });
      const ids = parent?.children.map((c) => c.studentId) || [];
      const invoices = await prisma.feeInvoice.findMany({ where: { studentId: { in: ids } }, include: { payments: true, student: true }, orderBy: { issuedAt: "desc" } });
      return NextResponse.json({ invoices });
    }
    const invoices = await prisma.feeInvoice.findMany({
      include: { payments: true, student: true },
      orderBy: { issuedAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ invoices });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canManageFees(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    if (body.action === "invoice") {
      const admissionNumber = String(body.admissionNumber || "").trim();
      const amount = Number(body.amount);
      const description = String(body.description || "School fee").trim();
      if (!admissionNumber || !Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json({ error: "Admission number and positive amount required" }, { status: 400 });
      }
      const student = await prisma.student.findFirst({ where: { admissionNumber } });
      if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
      const invoiceNumber = `SKR-FEE-${Date.now().toString(36).toUpperCase()}`;
      const invoice = await prisma.feeInvoice.create({
        data: {
          studentId: student.id,
          invoiceNumber,
          description,
          amount,
          totalAmount: amount,
          status: FeeStatus.PENDING,
        },
      });
      return NextResponse.json({ invoice });
    }
    if (body.action === "payment") {
      const invoiceId = String(body.invoiceId || "");
      const amount = Number(body.amount);
      const method = (Object.values(PaymentMethod) as string[]).includes(body.method) ? (body.method as PaymentMethod) : PaymentMethod.CASH;
      const ref = body.transactionRef ? String(body.transactionRef) : null;
      if (!invoiceId || !Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json({ error: "Invoice and amount required" }, { status: 400 });
      }
      if (ref) {
        const dup = await prisma.payment.findFirst({ where: { transactionRef: ref, status: PaymentStatus.SUCCESS } });
        if (dup) return NextResponse.json({ error: "Duplicate transaction reference", payment: dup }, { status: 409 });
      }
      const invoice = await prisma.feeInvoice.findFirst({ where: { id: invoiceId } });
      if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
      const receiptNumber = `SKR-RCP-${Date.now().toString(36).toUpperCase()}`;
      const payment = await prisma.payment.create({
        data: {
          invoiceId,
          amount,
          method,
          status: PaymentStatus.SUCCESS,
          transactionRef: ref,
          paidAt: new Date(),
          recordedById: user.id,
          receiptNumber,
        },
      });
      const paidAmount = invoice.paidAmount + amount;
      const status = paidAmount + 0.01 >= invoice.totalAmount ? FeeStatus.PAID : FeeStatus.PARTIAL;
      await prisma.feeInvoice.update({ where: { id: invoiceId }, data: { paidAmount, status } });
      return NextResponse.json({ payment, status });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Fee action failed" }, { status: 500 });
  }
}
