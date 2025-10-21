import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServerClient";
import { verifyAdminToken } from "@/lib/verifyAdminToken";

// Define the type for the object used to update the database
// We use 'unknown' for values to allow for strings, numbers, or boolean (though only string/number are used here)
type BikeUpdate = {
  [key: string]: string | number | boolean;
};

// 🌟 FIX 1: Define a stricter type for the error catch block
interface CustomError extends Error {
  message: string;
}

// ======================================================================
// PATCH Handler: Update Bike Details or Availability
// ======================================================================
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await verifyAdminToken(token);
  if (!admin)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const contentType = req.headers.get("content-type") || "";

    // JSON patch (for availability toggle)
    if (contentType.includes("application/json")) {
      // TypeScript can infer the type of the JSON body here, often `{ availability: boolean }`
      const { availability } = await req.json(); 
      const { error } = await supabaseServerClient
        .from("bikes")
        .update({ availability })
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    // --- FormData patch (update details + image) ---
    const formData = await req.formData();
    const updates: BikeUpdate = {}; 

    for (const [key, value] of formData.entries()) {
      if (key === "image_file") continue;
      // 'value' is of type FormDataEntryValue, which is string or File
      // Since we check for "image_file" above, 'value' here must be a string (or blob, but inputs are usually strings)
      updates[key] = key === "rent_per_hour" ? Number(value as string) : value as string;
    }

    // Get current image before changing
    const { data: existingData, error: fetchError } = await supabaseServerClient
      .from("bikes")
      .select("image_url")
      .eq("id", id)
      .single();
    if (fetchError) throw fetchError;

    const image_file = formData.get("image_file") as File | null;
    if (image_file) {
      const fileName = `${Date.now()}-${image_file.name}`;
      const { error: uploadError } = await supabaseServerClient.storage
        .from("bikes")
        .upload(fileName, image_file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabaseServerClient.storage
        .from("bikes")
        .getPublicUrl(fileName);
      updates.image_url = publicUrl.publicUrl;

      // Delete old image if it exists
      if (existingData?.image_url) {
        const path = existingData.image_url.split("/storage/v1/object/public/bikes/")[1];
        if (path) {
          await supabaseServerClient.storage.from("bikes").remove([path]);
        }
      }
    }

    // Update DB
    const { error } = await supabaseServerClient
      .from("bikes")
      .update(updates)
      .eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as CustomError; 
    console.error("PATCH error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ======================================================================
// DELETE Handler: Delete Bike Record and Image
// ======================================================================
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await verifyAdminToken(token);
  if (!admin)
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;

    // Fetch image URL before deleting record
    const { data: bikeData } = await supabaseServerClient
      .from("bikes")
      .select("image_url")
      .eq("id", id)
      .single();

    // Delete bike record
    const { error } = await supabaseServerClient.from("bikes").delete().eq("id", id);
    if (error) throw error;

    // Delete image file if exists
    if (bikeData?.image_url) {
      const path = bikeData.image_url.split("/storage/v1/object/public/bikes/")[1];
      if (path) {
        await supabaseServerClient.storage.from("bikes").remove([path]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as CustomError; 
    console.error("DELETE error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}