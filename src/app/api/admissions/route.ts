import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, canManageStudents, requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireAuth();
    if (!canManageStudents(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const rows = await prisma.admissionApplication.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    return NextResponse.json({ applications: rows });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canManageStudents(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const id = String(body.id || "");
    const status = String(body.status || "");
    const allowed = ["SUBMITTED", "IN_REVIEW", "APPROVED", "REJECTED", "INFO_REQUESTED"];
    if (!id || !allowed.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    const row = await prisma.admissionApplication.update({
      where: { id },
      data: { status, reviewedById: user.id, reviewedAt: new Date(), remarks: body.remarks ? String(body.remarks) : undefined },
    });
    return NextResponse.json({ application: row });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
