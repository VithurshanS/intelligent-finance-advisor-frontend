import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Construct Supabase URL from the host or use the provided URL
const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL

// For the anon key, we'll use a placeholder if not provided
const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// Create a single supabase client for the entire app
export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
    global: {
        headers: {
            "x-application-name": "financial-advisor",
        },
    },
    db: {
        schema: "public",
    },
})

// Helper function to check if Supabase is connected
export async function checkSupabaseConnection(): Promise<boolean> {
    console.log(supabaseUrl, supabaseAnonKey)
    try {
        const { data, error } = await supabase.from("user").select("count").limit(1)
        if (error) {
            console.error("Supabase connection error:", error)
            return false
        }
        return true
    } catch (err) {
        console.error("Failed to connect to Supabase:", err)
        return false
    }
}
