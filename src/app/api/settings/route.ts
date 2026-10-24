import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth, ADMIN_ROLES } from "@/lib/auth";

export async function GET() {
  const setting = await prisma.schoolSetting.findFirst({ where: { id: "default" } });
  return NextResponse.json({
    setting: setting
      ? {
          schoolName: setting.schoolName,
          address: setting.address,
          phone: setting.phone,
          email: setting.email,
          workingHours: setting.workingHours,
          vision: setting.vision,
          mission: setting.mission,
          principalMessage: setting.principalMessage,
          mapUrl: setting.mapUrl,
          udiseCode: setting.udiseCode,
        }
      : null,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const data: Record<string, string> = {};
    for (const key of ["phone", "email", "workingHours", "address", "vision", "mission", "principalMessage"]) {
      if (typeof body[key] === "string") data[key] = body[key].trim();
    }
    const setting = await prisma.schoolSetting.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });
    return NextResponse.json({ ok: true, id: setting.id, updatedBy: user.id });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
