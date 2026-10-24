import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth, ADMIN_ROLES } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const user = await requireAuth();
    if (ADMIN_ROLES.includes(user.role)) {
      const rows = await prisma.leaveRequest.findMany({ include: { staff: true }, orderBy: { createdAt: "desc" }, take: 100 });
      return NextResponse.json({ rows });
    }
    const staff = await prisma.staff.findFirst({ where: { userId: user.id } });
    if (!staff) return NextResponse.json({ rows: [] });
    const rows = await prisma.leaveRequest.findMany({ where: { staffId: staff.id }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ rows });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    if (body.action === "decide") {
      if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      const status = body.status === "APPROVED" ? "APPROVED" : "REJECTED";
      const row = await prisma.leaveRequest.update({
        where: { id: String(body.id) },
        data: { status, approvedBy: user.id },
      });
      return NextResponse.json({ row });
    }
    if (user.role !== Role.TEACHER && !ADMIN_ROLES.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const staff = await prisma.staff.findFirst({ where: { userId: user.id } });
    if (!staff) return NextResponse.json({ error: "Staff profile not linked" }, { status: 400 });
    const fromDate = new Date(String(body.fromDate));
    const toDate = new Date(String(body.toDate));
    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime()) || toDate < fromDate) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }
    const row = await prisma.leaveRequest.create({
      data: { staffId: staff.id, fromDate, toDate, reason: body.reason ? String(body.reason) : null, status: "PENDING" },
    });
    return NextResponse.json({ row });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Leave failed" }, { status: 500 });
  }
}
