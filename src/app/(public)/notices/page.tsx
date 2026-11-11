import { prisma } from "@/lib/prisma";
import { NoticesClient } from "./NoticesClient";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  let notices: {
    id: string;
    title: string;
    content: string;
    publishAt: Date | null;
    createdAt: Date;
    priority: string;
  }[] = [];
  try {
    notices = await prisma.notice.findMany({
      where: { isPublished: true, audience: { in: ["PUBLIC", "ALL"] } },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  } catch {
    notices = [];
  }

  return (
    <NoticesClient
      notices={notices.map((n) => ({
        id: n.id,
        title: n.title,
        content: n.content,
        publishAt: n.publishAt?.toISOString() ?? null,
        createdAt: n.createdAt.toISOString(),
        priority: n.priority,
      }))}
    />
  );
}
