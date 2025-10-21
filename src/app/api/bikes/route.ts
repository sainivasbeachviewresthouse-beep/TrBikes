import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

/**
 * GET: Fetches a list of all bikes (publicly accessible), active ones first.
 */
export async function GET() {
  try {
    const { data, error } = await supabaseServerClient
      .from("bikes")
      .select("*")
      .order("availability", { ascending: false }) // active bikes first
      .order("created_at", { ascending: true }); // optional: oldest first

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
