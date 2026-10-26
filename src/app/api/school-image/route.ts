import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const revalidate = 86400;

/**
 * Same-origin image proxy for the school's public photos hosted by UPMSP Pehchan.
 * Only allow image filenames with the school's official 011424 prefix to avoid
 * turning this endpoint into an arbitrary URL proxy.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageClass = searchParams.get("class");
  const name = searchParams.get("name") ?? "";

  if (imageClass !== "S" && imageClass !== "T") {
    return new Response("Invalid image class", { status: 400 });
  }

  if (!/^011424_[A-Za-z0-9_.-]+\.(?:jpg|jpeg|png)$/i.test(name)) {
    return new Response("Invalid school image name", { status: 400 });
  }

  const source = new URL("https://upmsp.edu.in/GetImage.aspx");
  source.searchParams.set("Class", imageClass);
  source.searchParams.set("Dist", imageClass === "S" ? "01" : "011424");
  source.searchParams.set("ImageName", name);

  try {
    const upstream = await fetch(source, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SKRCollegeWebsite/1.0)",
        "Referer": "https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });

    if (!upstream.ok) {
      return new Response("School image unavailable", {
        status: 502,
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    if (!contentType.toLowerCase().startsWith("image/")) {
      return new Response("The UPMSP source did not return an image", {
        status: 502,
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Unable to load school image right now", {
      status: 502,
      headers: { "Cache-Control": "public, max-age=300" },
    });
  }
}
