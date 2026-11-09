import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const b64 = readFileSync(join(process.cwd(), "public", "campus.b64"), "utf8").trim();
    const buf = Buffer.from(b64, "base64");
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (e) {
    return new NextResponse("Campus image not found", { status: 404 });
  }
}
