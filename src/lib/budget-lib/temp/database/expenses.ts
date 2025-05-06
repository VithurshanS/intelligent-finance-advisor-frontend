import { supabase } from "./supabase"
import type { Database } from "./types"

export type Expense = Database["public"]["Tables"]["transactions"]["Row"]
export type NewExpense = Database["public"]["Tables"]["transactions"]["Insert"]

export async function getExpensesByUserId(userId: string): Promise<Expense[]> {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })

    if (error) {
        console.error("Error fetching transactions:", error)
        return []
    }

    return data || []
}

export async function createExpense(expense: NewExpense): Promise<Expense | null> {
    const { data, error } = await supabase.from("transactions").insert(expense).select().single()

    if (error) {
        console.error("Error creating expense:", error)
        return null
    }

    return data
}

export async function updateExpense(id: string, updates: Partial<Expense>): Promise<Expense | null> {
    const { data, error } = await supabase.from("transactions").update(updates).eq("id", id).select().single()

    if (error) {
        console.error("Error updating expense:", error)
        return null
    }

    return data
}

export async function deleteExpense(id: string): Promise<boolean> {
    const { error } = await supabase.from("transactions").delete().eq("id", id)

    if (error) {
        console.error("Error deleting expense:", error)
        return false
    }

    return true
}

export async function getExpensesByCategory(userId: string): Promise<Record<string, number>> {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const { data, error } = await supabase.from("transactions").select("category, amount").eq("user_id", userId).eq("type", "expense").gte("created_at", sixtyDaysAgo.toISOString())



    if (error) {
        console.error("Error fetching transactions by category:", error)
        return {}
    }

    const categories: Record<string, number> = {}

    for (const expense of data || []) {
        if (!categories[expense.category]) {
            categories[expense.category] = 0
        }
        categories[expense.category] += expense.amount
    }

    return categories
}

export type TransactionSummary = {
    income: number;
    expense: number;
    balance: number;
    previouseIncome: number;
    previousExpense: number;
    previousBalance: number;
    transactions: { date: string, balance: number }[] | null
}

export async function getSummaryByUserId(userId: string): Promise<TransactionSummary> {
    try {
        // Fallback approach: Use separate queries if rpc isn't available
        // Calculate date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        // Get income for last 30 days
        const { data: incomeData } = await supabase
            .from('transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'income')
            .gte('created_at', thirtyDaysAgo.toISOString()); // Using gte instead of lte

        // Get all expenses (no date filter)
        const { data: expenseData } = await supabase
            .from('transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'expense')
            .gte('created_at', thirtyDaysAgo.toISOString());;

        // console.log(incomeData, expenseData)

        const income = incomeData?.reduce((sum: any, t: { amount: any }) => sum + (t.amount || 0), 0) || 0;
        const expense = expenseData?.reduce((sum: any, t: { amount: any }) => sum + (t.amount || 0), 0) || 0;

        // Get income for last 30 days
        const { data: incomeDataP } = await supabase
            .from('transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'income')
            .gte('created_at', sixtyDaysAgo.toISOString())
            .lt('created_at', thirtyDaysAgo.toISOString());

        // Get all expenses (no date filter)
        const { data: expenseDataP } = await supabase
            .from('transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'expense')
            .gte('created_at', sixtyDaysAgo.toISOString())
            .lt('created_at', thirtyDaysAgo.toISOString());

        // console.log(incomeData, expenseData)

        const incomep = incomeDataP?.reduce((sum: any, t: { amount: any }) => sum + (t.amount || 0), 0) || 0;
        const expensep = expenseDataP?.reduce((sum: any, t: { amount: any }) => sum + (t.amount || 0), 0) || 0;

        const { data: transactions } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)
            .gte('created_at', sixtyDaysAgo.toISOString())
            .order('created_at', { ascending: true });

        // Calculate daily balances
        const dailyBalances = transactions?.reduce((acc: { [x: string]: number }, transaction: { created_at: string | number | Date; type: string; amount: number }) => {
            const date = new Date(transaction.created_at).toISOString().split('T')[0]; // Get just the date part

            if (!acc[date]) {
                acc[date] = 0; // Initialize balance for this date
            }

            if (transaction.type === 'income') {
                acc[date] += transaction.amount;
            } else if (transaction.type === 'expense') {
                acc[date] -= transaction.amount;
            }

            return acc;
        }, {} as Record<string, number>);

        // Convert to array of { date, balance } objects sorted by date
        const dailyBalancesArray = dailyBalances ? Object.entries(dailyBalances)
            .map(([date, balance]) => ({ date, balance }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            : [];

        // calculate the sum of expenses, incomes, balnaces each day seperately and put in a list



        return {
            income,
            expense,
            balance: income - expense,
            previouseIncome: incomep,
            previousExpense: expensep,
            previousBalance: incomep - expensep,
            transactions: dailyBalancesArray
        };
    } catch (err) {
        console.error("Error in getSummaryByUserId:", err);
        return {
            income: 0,
            expense: 0,
            balance: 0,
            previouseIncome: 0,
            previousExpense: 0,
            previousBalance: 0,
            transactions: []
        };
    }
}

