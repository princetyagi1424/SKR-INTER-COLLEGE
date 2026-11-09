import { LOGO_256_B64 } from "@/lib/school-logo-b64";

export const runtime = "nodejs";

export async function GET() {
  const png = Buffer.from(LOGO_256_B64, "base64");
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
