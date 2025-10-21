import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServerClient";
import { verifyAdminToken } from "@/lib/verifyAdminToken";

// Define a minimal interface for errors we expect to handle
interface CustomError extends Error {
  message: string;
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await verifyAdminToken(token);
  if (!admin)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const registration_no = formData.get("registration_no") as string;
    const category = formData.get("category") as string;
    const color = formData.get("color") as string;
    // FormData.get() returns FormDataEntryValue (string or File). We convert to Number.
    const rent_per_hour = Number(formData.get("rent_per_hour")); 
    const image_file = formData.get("image_file") as File | null;
    const image_url = formData.get("image_url") as string | null;

    let finalImageUrl = image_url || "";

    // If image file is uploaded → upload to Supabase storage
    if (image_file) {
      // 👇 no "bikes/" prefix here — bucket name already is "bikes"
      const fileName = `${Date.now()}-${image_file.name}`;
      const { error: uploadError } = await supabaseServerClient.storage
        .from("bikes")
        .upload(fileName, image_file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabaseServerClient.storage
        .from("bikes")
        .getPublicUrl(fileName);

      finalImageUrl = publicUrl.publicUrl;
    }

    const { data, error } = await supabaseServerClient
      .from("bikes")
      .insert([{ name, registration_no, category, color, rent_per_hour, image_url: finalImageUrl }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const error = err as CustomError; 
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}