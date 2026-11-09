import { NextResponse } from "next/server";
import { P0 } from "@/lib/campus-p0";
import { P1 } from "@/lib/campus-p1";
import { P2 } from "@/lib/campus-p2";
import { P3 } from "@/lib/campus-p3";

export async function GET() {
  const b64 = P0 + P1 + P2 + P3;
  const buf = Buffer.from(b64, "base64");
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
