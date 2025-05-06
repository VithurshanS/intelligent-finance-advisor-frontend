import { supabase, checkSupabaseConnection } from '../database/supabase'
import { createUser, getUserByEmail } from '../database/users'
import type { NewUser } from '../database/users'

export async function signUp(email: string, password: string, fullName: string): Promise<{ success: boolean; message: string; userId?: string }> {
    try {
        // Check if user already exists
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return { success: false, message: 'User with this email already exists' }
        }

        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            console.error('Auth error during signup:', authError)
            return { success: false, message: authError.message }
        }

        if (!authData.user) {
            return { success: false, message: 'Failed to create user' }
        }

        // Create user in the database
        const newUser: NewUser = {
            id: authData.user.id,
            created_at: new Date().toISOString(),
            email: email,
            name: fullName,
        }

        const user = await createUser(newUser)
        if (!user) {
            return { success: false, message: 'Failed to create user profile' }
        }

        return { success: true, message: 'User created successfully', userId: user.id }
    } catch (error) {
        console.error('Error during signup:', error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; message: string; userId?: string }> {
    try {
        // const isConnected = await checkSupabaseConnection()
        // if (!isConnected) {
        //     return { success: false, message: 'Failed to connect to Supabase' }
        // } else {
        //     console.log('Connected to Supabase');
        // }
        const existingUser = await getUserByEmail(email)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error && existingUser) {
            console.log('Need to verify the verification email')
            return { success: false, message: error.message }
        }
        if (error) {
            console.error('Error during sign in:', error)
            return { success: false, message: error.message }
        }

        if (!data.user) {
            return { success: false, message: 'Invalid credentials' }
        }

        return { success: true, message: 'Signed in successfully', userId: data.user.id }
    } catch (error) {
        console.error('Error during sign in:', error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}

export async function signOut(): Promise<{ success: boolean; message: string }> {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Error during sign out:', error)
            return { success: false, message: error.message }
        }

        return { success: true, message: 'Signed out successfully' }
    } catch (error) {
        console.error('Error during sign out:', error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}

export async function getCurrentUser() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
            console.error('Error getting session:', error)
            return null
        }

        if (!session) {
            return null
        }

        return session.user
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}
