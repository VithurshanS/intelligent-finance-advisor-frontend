import { supabase } from './supabase'
import type { Database } from './types'

export type Investment = Database['public']['Tables']['investments']['Row']
export type NewInvestment = Database['public']['Tables']['investments']['Insert']

export async function getInvestmentsByUserId(userId: string): Promise<Investment[]> {
    const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', userId)
        .order('value', { ascending: false })

    if (error) {
        console.error('Error fetching investments:', error)
        return []
    }

    return data || []
}

export async function createInvestment(investment: NewInvestment): Promise<Investment | null> {
    const { data, error } = await supabase
        .from('investments')
        .insert(investment)
        .select()
        .single()

    if (error) {
        console.error('Error creating investment:', error)
        return null
    }

    return data
}

export async function updateInvestment(id: string, updates: Partial<Investment>): Promise<Investment | null> {
    const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating investment:', error)
        return null
    }

    return data
}

export async function deleteInvestment(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting investment:', error)
        return false
    }

    return true
}
