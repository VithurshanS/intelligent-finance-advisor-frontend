export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            user: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    email: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name?: string
                    email?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    email?: string
                }
                Relationships: []
            }
            transactions: {
                Row: {
                    id: string
                    created_at: string
                    type: string
                    reason: string
                    category: string
                    amount: number
                    user_id: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    type: string
                    reason: string
                    category: string
                    amount: number
                    user_id: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    type?: string
                    reason?: string
                    category?: string
                    amount?: number
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "expenses_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "user"
                        referencedColumns: ["id"]
                    }
                ]
            }
            goals: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    name: string
                    target: number
                    current: number
                    deadline: string
                    priority: string
                    category: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    name: string
                    target: number
                    current: number
                    deadline: string
                    priority: string
                    category: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    name?: string
                    target?: number
                    current?: number
                    deadline?: string
                    priority?: string
                    category?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "goals_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            investments: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    name: string
                    ticker: string
                    value: number
                    allocation: number
                    change: number
                    risk: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    name: string
                    ticker: string
                    value: number
                    allocation: number
                    change: number
                    risk: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    name?: string
                    ticker?: string
                    value?: number
                    allocation?: number
                    change?: number
                    risk?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "investments_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
