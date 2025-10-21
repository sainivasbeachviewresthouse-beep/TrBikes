import { createClient } from "@supabase/supabase-js";

// Extend globalThis type safely
declare global {
  var NEXT_PUBLIC_SUPABASE_URL: string | undefined;
  var SUPABASE_SERVICE_ROLE_KEY: string | undefined;
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  globalThis.NEXT_PUBLIC_SUPABASE_URL;

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  globalThis.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("❌ Supabase URL or Service Role Key is missing. Check Cloudflare environment variables.");
}

export const supabaseServerClient = createClient(supabaseUrl, supabaseServiceRoleKey);
