"use server";
import { OptimizedPortfolioResult } from "@/lib/types/profile";

import { BackendResultsWithSuccessAndMessage } from "@/lib/types/profile";
import { z } from "zod";
import AxiosInstance from "@/lib/server-fetcher";

// Coerce types safely using zod
const optimizePortfolioSchema = z.object({
    tickers: z.array(z.string()).min(2, "At least two tickers are required"),
    years: z.coerce.number().positive("Investment years must be positive"),
    investment_amount: z.coerce.number().positive("Investment amount must be positive"),
    target_amount: z.coerce.number().positive("Target amount must be positive"),
    use_risk_score:     z.coerce.boolean(),
    risk_score_percent: z.coerce.number().optional(),  
})
.refine(
    (d) => !d.use_risk_score || typeof d.risk_score_percent === "number",
    {
      message: "risk_score_percent is required when use_risk_score is true",
      path: ["risk_score_percent"],
    }
  );

export async function optimizePortfolio(
    prevState: BackendResultsWithSuccessAndMessage,
    formData: FormData
): Promise<BackendResultsWithSuccessAndMessage> {
    try {
        const rawData = {
            tickers: JSON.parse(formData.get("tickers") as string),
            years: formData.get("years"),
            investment_amount: formData.get("investmentAmount"),
            target_amount: formData.get("targetAmount"),
            use_risk_score:     (formData.get("use_risk_score") === "true"),
            risk_score_percent: formData.get("risk_score_percent")
                                  ? parseFloat(formData.get("risk_score_percent") as string)
                                  : undefined,
          };
        const data = optimizePortfolioSchema.parse(rawData);


        const result = await AxiosInstance.post("/profile/optimize_portfolio", data);

        return {
            success: true,
            message: "Optimization successful",
            data: result.data,
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Optimization failed";
        return {
            success: false,
            message: errorMessage,
        };
    }
}


export async function getPortfolioExplanation(portfolioData: OptimizedPortfolioResult) {
    try {
        const response = await AxiosInstance.post("/portfolio-explanation/explain", portfolioData);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Server Action Error:", errorMessage);
        return { success: false, error: errorMessage };
    }
}