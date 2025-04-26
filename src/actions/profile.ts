// actions/profile.ts
"use server";

import { outputForResults} from "@/lib/types/profile";
import { z } from "zod";
import AxiosInstance from "@/lib/server-fetcher";


const optimizePortfolioSchema = z.object({
    tickers: z.array(z.string()).min(1, "At least one ticker is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    num_portfolios: z.number().min(1, "At least 1 portfolio required"),
    years: z.number().positive("Investment years must be positive"),
    investment_amount: z.number().positive("Investment amount must be positive"),
    target_amount: z.number().positive("Target amount must be positive"),
});

export async function optimizePortfolio(
    prevState: outputForResults,
    formData: FormData
): Promise<outputForResults> {
    try {
        const rawData = {
            tickers: JSON.parse(formData.get("tickers") as string),
            start_date: formData.get("startDate") as string,
            end_date: formData.get("endDate") as string,
            num_portfolios: Number(formData.get("numPortfolios")),
            years: Number(formData.get("years")),
            investment_amount: Number(formData.get("investmentAmount")),
            target_amount: Number(formData.get("targetAmount")),
        };

        const data = optimizePortfolioSchema.parse(rawData);

        const result = await AxiosInstance.post("/api/profile/optimize_portfolio", data);

        // Return result data as part of the response
        return {
            success: true,
            message: "Optimization successful",
            data: result.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Optimization failed",
        };
    }
}
