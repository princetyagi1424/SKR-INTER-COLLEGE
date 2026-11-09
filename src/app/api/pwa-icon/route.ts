import { NextRequest } from "next/server";
import { ICON_180_B64, ICON_192_B64 } from "@/lib/school-logo-b64";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sizeParam = Number(req.nextUrl.searchParams.get("size") || "192");
  const b64 = sizeParam === 180 ? ICON_180_B64 : ICON_192_B64;
  const png = Buffer.from(b64, "base64");
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
