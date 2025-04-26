export interface outputForResults {
    success: boolean;
    message?: string;
    data?: {
        optimal_weights: Record<string, number>; // ex: { AAPL: 0.62, MSFT: 0.37, ... }
        expected_return: number;                 // ex: 0.2652
        volatility: number;                     // ex: 0.3145
        sharpe_ratio: number;                     // ex: 0.8433
        goal: string;                            // ex: "$100,000.00 → $110,000.00 in 2.0 year(s)"
        monte_carlo_projection: {
            expected_final_value: number;            // ex: 169485.61
            min_final_value: number;                 // ex: 2719.03
            max_final_value: number;                 // ex: 663961.15
            success_rate_percent: number;            // ex: 75.32
        };
    };
}


export interface OptimizedPortfolioResult {
    optimal_weights: {
        [key: string]: number;
    };
    expected_return: number;
    volatility: number;
    sharpe_ratio: number;
    goal: string;
    monte_carlo_projection: {
        expected_final_value: number;
        min_final_value: number;
        max_final_value: number;
        success_rate_percent: number;
    };
}