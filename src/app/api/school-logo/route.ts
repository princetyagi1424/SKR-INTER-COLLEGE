import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "icons");
  try {
    const chunks: string[] = [];
    for (let i = 0; i < 16; i++) {
      try {
        chunks.push((await readFile(path.join(dir, `icon-180-${i}.b64`), "utf8")).replace(/\s+/g, ""));
      } catch {
        break;
      }
    }
    const b64 = chunks.join("");
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
