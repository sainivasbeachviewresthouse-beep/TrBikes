import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    // Fetch admin by email
    const { data, error } = await supabaseServerClient
      .from("admins")
      .select("id, name, email, password_hash")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 401 }
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(password, data.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT (includes name)
    const token = await new jose.SignJWT({
      id: data.id,
      email: data.email,
      name: data.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return NextResponse.json({
      success: true,
      token,
      admin: { id: data.id, name: data.name, email: data.email },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
