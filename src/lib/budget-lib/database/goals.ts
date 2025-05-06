import { supabase } from "./supabase"
import type { Database } from "./types"

export type Goal = Database["public"]["Tables"]["goals"]["Row"]
export type NewGoal = Database["public"]["Tables"]["goals"]["Insert"]

export async function getGoalsByUserId(userId: string): Promise<Goal[]> {
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", userId)
        .order("deadline", { ascending: true })

    if (error) {
        console.error("Error fetching goals:", error)
        return []
    }

    return data || []
}

export async function createGoal(goal: NewGoal): Promise<Goal | null> {
    const { data, error } = await supabase.from("goals").insert(goal).select().single()

    if (error) {
        console.error("Error creating goal:", error)
        return null
    }

    return data
}

export async function updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
    const { data, error } = await supabase.from("goals").update(updates).eq("id", id).select().single()

    if (error) {
        console.error("Error updating goal:", error)
        return null
    }

    return data
}

export async function deleteGoal(id: string): Promise<boolean> {
    const { error } = await supabase.from("goals").delete().eq("id", id)

    if (error) {
        console.error("Error deleting goal:", error)
        return false
    }

    return true
}
