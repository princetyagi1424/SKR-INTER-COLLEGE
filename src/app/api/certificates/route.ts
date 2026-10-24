import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth, ADMIN_ROLES } from "@/lib/auth";
import { DocumentType, Role } from "@prisma/client";

const TYPES = Object.values(DocumentType);

export async function GET() {
  try {
    const user = await requireAuth();
    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findFirst({ where: { userId: user.id } });
      if (!student) return NextResponse.json({ certificates: [] });
      const certificates = await prisma.certificate.findMany({ where: { studentId: student.id }, orderBy: { createdAt: "desc" } });
      return NextResponse.json({ certificates });
    }
    if (![...ADMIN_ROLES, Role.ADMISSION_OFFICER].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { student: true },
    });
    return NextResponse.json({ certificates });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const type = TYPES.includes(body.type) ? body.type : DocumentType.BONAFIDE;

    if (body.action === "request" && user.role === Role.STUDENT) {
      const student = await prisma.student.findFirst({ where: { userId: user.id } });
      if (!student) return NextResponse.json({ error: "Student profile missing" }, { status: 404 });
      const serialNumber = `SKR-REQ-${Date.now().toString(36).toUpperCase()}`;
      const certificate = await prisma.certificate.create({
        data: {
          studentId: student.id,
          type,
          serialNumber,
          title: String(body.title || type),
          status: "REQUESTED",
          content: { note: body.note ? String(body.note) : "" },
        },
      });
      return NextResponse.json({ certificate });
    }

    if (![...ADMIN_ROLES, Role.ADMISSION_OFFICER].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (body.action === "issue") {
      const admissionNumber = String(body.admissionNumber || "").trim();
      const student = await prisma.student.findFirst({ where: { admissionNumber } });
      if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
      const serialNumber = `SKR-${type.slice(0, 3)}-${Date.now().toString(36).toUpperCase()}`;
      const certificate = await prisma.certificate.create({
        data: {
          studentId: student.id,
          type,
          serialNumber,
          title: String(body.title || `${type} certificate`),
          status: "ISSUED",
          issuedAt: new Date(),
          issuedById: user.id,
          content: { purpose: body.purpose ? String(body.purpose) : "" },
        },
      });
      return NextResponse.json({ certificate });
    }

    if (body.action === "approve") {
      const id = String(body.id || "");
      const existing = await prisma.certificate.findFirst({ where: { id } });
      if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
      const certificate = await prisma.certificate.update({
        where: { id },
        data: { status: "ISSUED", issuedAt: new Date(), issuedById: user.id },
      });
      return NextResponse.json({ certificate });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error(e);
    return NextResponse.json({ error: "Certificate failed" }, { status: 500 });
  }
}
