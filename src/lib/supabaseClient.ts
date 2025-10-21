import { createClient } from "@supabase/supabase-js";

// Extend global types for Edge environments
declare global {
  var NEXT_PUBLIC_SUPABASE_URL: string | undefined;
  var NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined;
}

// Fallback logic for both Node (process.env) and Edge (globalThis)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || globalThis.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  globalThis.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate configuration early (optional but recommended)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Missing Supabase configuration. Check your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Create client safely
export const supabaseClient = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
