import { NextRequest } from "next/server";
import zlib from "zlib";

export const runtime = "nodejs";
export const dynamic = "force-static";

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(tag: string, data: Buffer) {
  const type = Buffer.from(tag);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.concat([type, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf));
  return Buffer.concat([len, type, data, crc]);
}

function makePng(size: number) {
  const w = size;
  const h = size;
  const rows: Buffer[] = [];
  for (let y = 0; y < h; y++) {
    const row = Buffer.alloc(1 + w * 4);
    row[0] = 0;
    for (let x = 0; x < w; x++) {
      const cx = w / 2;
      const cy = h / 2;
      const d = Math.hypot(x - cx, y - cy);
      const i = 1 + x * 4;
      if (d > w * 0.48) {
        row[i] = 0;
        row[i + 1] = 0;
        row[i + 2] = 0;
        row[i + 3] = 0;
      } else {
        let r = 200,
          g = 16,
          b = 46;
        if (d < w * 0.18) {
          r = 227;
          g = 40;
          b = 55;
        }
        row[i] = r;
        row[i + 1] = g;
        row[i + 2] = b;
        row[i + 3] = 255;
      }
    }
    rows.push(row);
  }
  const raw = Buffer.concat(rows);
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

export async function GET(req: NextRequest) {
  const sizeParam = Number(req.nextUrl.searchParams.get("size") || "192");
  const size = [180, 192, 512].includes(sizeParam) ? sizeParam : 192;
  const png = makePng(size);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
