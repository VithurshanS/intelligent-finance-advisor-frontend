import { supabase } from './supabase'
import type { Database } from './types'

export type User = Database['public']['Tables']['user']['Row']
export type NewUser = Database['public']['Tables']['user']['Insert']

export async function getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching user:', error)
        return null
    }

    return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .single()

    if (error) {
        console.log('Error fetching user by email:', error)
        return null
    }

    return data
}

export async function createUser(user: NewUser): Promise<User | null> {
    const { data, error } = await supabase
        .from('user')
        .insert(user)
        .select()
        .single()

    if (error) {
        console.error('Error creating user:', error)
        return null
    }

    return data
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
        .from('user')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating user:', error)
        return null
    }

    return data
}
