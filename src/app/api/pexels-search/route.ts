// src/app/api/pexels-search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  if (!query) return NextResponse.json({ success: false, message: "Query required" }, { status: 400 });

  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
  if (!PEXELS_API_KEY) return NextResponse.json({ success: false, message: "API key missing" }, { status: 500 });

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );

    const data = await res.json();
    return NextResponse.json({ success: true, photos: data.photos });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch from Pexels", error }, { status: 500 });
  }
}
