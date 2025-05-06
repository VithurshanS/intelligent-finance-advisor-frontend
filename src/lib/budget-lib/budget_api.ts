// budgetApi.ts
import {BACKEND_BASE_URL as BURL} from "@/lib/const";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || BURL;

export interface Transaction {
    id: number;
    user_id: string;
    amount: number;
    category: string;
    date: string;
    created_at: string;
    reason: string;
    type: string;
}

export interface BudgetGoal {
    id: number;
    user_id: string;
    title: string;
    category: string;
    amount: number;
    created_at: string;
    deadline: string;
}

export interface TransactionCreate {
    user_id: string;
    amount: number;
    category: string;
    reason: string;
    date: string;
    created_at: string;
    type: string;
}

export interface TransactionUpdate {
    amount?: number;
    category?: string;
    reason?: string;
    date?: string;
    created_at?: string;
    type?: string;
}

export interface BudgetGoalCreate {
    user_id: string;
    title: string;
    category: string;
    amount: number;
    created_at: string;
    deadline: string;
}

export interface BudgetGoalUpdate {
    title?: string;
    category?: string;
    amount?: number;
    created_at?: string;
    deadline?: string;
}

export interface TransactionSummary {
    income: number;
    expense: number;
    balance: number;
    previous_balance: number;
    previous_income: number;
    previous_expense: number;
    transactions: {
        date: string;
        balance: number;
    }[];
}

export interface PredictionResponse {
    predictions: {
        today_income: number;
        today_expense: number;
        this_week_income: number;
        this_week_expense: number;
        this_month_income: number;
        this_month_expense: number;
        income_next_day: number;
        income_next_week: number;
        income_next_month: number;
        expense_next_day: number;
        expense_next_week: number;
        expense_next_month: number;
        income: Record<string, number>;
        expense: Record<string, number>;
    };
    financial_advice: {
        observations: string;
        daily_actions: string;
        weekly_actions: string;
        monthly_actions: string;
        risks: string;
        long_term_insights: string;
    };
    budget_goals: {
        time_period: string;
        amount: number;
        description: string;
    }[];
}

export interface BudgetReportResponse {
    transactions: Transaction[];
    budget_report: {
        summary: {
            total_income: number;
            total_expenses: number;
            net_savings: number;
            top_spending_categories: {
                category: string;
                percentage: number;
            }[];
        };
        assessment: string;
        recommendations: string[];
        alerts: string[];
    };
}

export interface BudgetReport {
    summary: {
        total_income: number;
        total_expenses: number;
        net_savings: number;
        top_spending_categories: {
            category: string;
            percentage: number;
        }[];
    };
    assessment: string;
    recommendations: string[];
    alerts: string[];

}

export interface CategorizeResponse {
    category: string;
    confidence: number;
}

export interface ChatResponse {
    response: string;
}

export interface CategoryBreakdown {
    category: string;
    amount: number;
}

// Helper function for making API calls
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BACKEND_BASE_URL}/budget${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
}

// Budget API functions
export const BudgetApi = {
    // Endpoint 1: Get financial predictions and advice
    async getPredictions(userId: string): Promise<PredictionResponse> {
        return fetchApi(`/predictions?user_id=${userId}`);
    },

    // Endpoint 2: Get budget report for a specific month
    async getBudgetReport(userId: string): Promise<BudgetReportResponse> {
        return fetchApi(`/budget-report?user_id=${userId}`);
    },

    // Endpoint 3: Categorize a new transaction
    async categorizeTransaction(
        description: string,
        amount: number,
        type: string
    ): Promise<CategorizeResponse> {
        return fetchApi(
            `/categorize-transaction?description=${encodeURIComponent(
                description
            )}&amount=${amount}&type=${encodeURIComponent(type)}`
        );
    },

    // Endpoint 4: Chat with the LLM
    async chat(prompt: string): Promise<ChatResponse> {
        return fetchApi(`/chat?prompt=${encodeURIComponent(prompt)}`);
    },

    // Transaction CRUD operations
    async getTransactionsByUser(userId: string): Promise<Transaction[]> {
        return fetchApi(`/transactions/${userId}}`);
    },

    async createTransaction(transaction: TransactionCreate): Promise<Transaction> {
        console.log(transaction);
        return fetchApi('/transactions', {
            method: 'POST',
            body: JSON.stringify(transaction),
        });
    },

    async updateTransaction(
        transactionId: number,
        updates: TransactionUpdate
    ): Promise<Transaction> {
        return fetchApi(`/transactions/${transactionId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    async deleteTransaction(transactionId: number): Promise<void> {
        await fetchApi(`/transactions/${transactionId}`, {
            method: 'DELETE',
        });
    },

    async getTransactionsByCategory(userId: string): Promise<CategoryBreakdown[][]> {
        return fetchApi(`/transactions/categories/${userId}`);
    },

    async getTransactionSummary(userId: string): Promise<TransactionSummary> {
        return fetchApi(`/transactions/summary/${userId}`);
    },

    // Budget Goal CRUD operations
    async getBudgetGoals(userId: string): Promise<BudgetGoal[]> {
        return fetchApi(`/budget-goals/${(userId)}`);
    },

    async createBudgetGoal(goal: BudgetGoalCreate): Promise<BudgetGoal> {
        return fetchApi('/budget-goals', {
            method: 'POST',
            body: JSON.stringify(goal),
        });
    },

    async updateBudgetGoal(
        goalId: number,
        updates: BudgetGoalUpdate
    ): Promise<BudgetGoal> {
        return fetchApi(`/budget-goals/${goalId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    async deleteBudgetGoal(goalId: number): Promise<void> {
        await fetchApi(`/budget-goals/${goalId}`, {
            method: 'DELETE',
        });
    },
};