import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthError, requireAuth, ADMIN_ROLES } from "@/lib/auth";
import { NoticeAudience, NoticePriority, Role } from "@prisma/client";

export async function GET() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ notices });
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const allowed = [...ADMIN_ROLES, Role.TEACHER];
    if (!allowed.includes(user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    if (!title || !content) return NextResponse.json({ error: "Title and content required" }, { status: 400 });
    const audience = (Object.values(NoticeAudience) as string[]).includes(body.audience) ? body.audience : "PUBLIC";
    const priority = (Object.values(NoticePriority) as string[]).includes(body.priority) ? body.priority : "NORMAL";
    const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        audience,
        priority,
        isPublished: true,
        publishAt: new Date(),
        academicSessionId: session?.id,
        createdById: user.id,
      },
    });
    return NextResponse.json({ notice });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: e.status });
    return NextResponse.json({ error: "Could not publish notice" }, { status: 500 });
  }
}
