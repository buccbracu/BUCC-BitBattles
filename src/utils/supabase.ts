import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) {
  throw Error("No Supabase URL");
}
if (!supabaseKey) {
  throw Error("No Supabase key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
