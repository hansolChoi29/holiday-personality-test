import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xymjhflqavkmfqurownd.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log(supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseKey);
