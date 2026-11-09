import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function loadB64(prefix: string) {
  const dir = path.join(process.cwd(), "public", "icons");
  const chunks: string[] = [];
  for (let i = 0; i < 16; i++) {
    try {
      const t = await readFile(path.join(dir, `${prefix}-${i}.b64`), "utf8");
      chunks.push(t.replace(/\s+/g, ""));
    } catch {
      break;
    }
  }
  if (!chunks.length) throw new Error("no icon parts");
  return chunks.join("");
}

export async function GET(req: NextRequest) {
  const sizeParam = Number(req.nextUrl.searchParams.get("size") || "192");
  const prefix = sizeParam === 180 ? "icon-180" : "icon-192";
  try {
    const b64 = await loadB64(prefix);
    return new Response(Buffer.from(b64, "base64"), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Logo unavailable", { status: 404 });
  }
}
