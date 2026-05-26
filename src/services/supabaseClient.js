import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://yvcpkfuoorbvilzyycna.supabase.co"
const supabaseAnonKey = "sb_publishable_u96rUdaqj_F4z7mPPAbggQ_Uv3ltB4q"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)