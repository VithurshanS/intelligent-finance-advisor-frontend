'use server';

import AxiosInstance from "@/lib/server-fetcher";
import {AxiosError} from "axios";

// TypeScript interfaces based on the Pydantic models
interface DBStock {
    in_db: boolean | null;
    status: string | null;
    asset_id: number | null;
    risk_score: number | null;
    risk_score_updated: string | null;
}

export interface Asset {
    name: string;
    company_url: string;
    exchange: string;
    ticker: string;
    type: string;
    sector: string;
    industry: string;
    currency: string;
    prev_close: number | null;
    open_price: number | null;
    last_price: number | null;
    day_high: number | null;
    day_low: number | null;
    volume: number | null;
    avg_volume: number | null;
    beta: number | null;
    market_cap: number | null;
    fifty_two_week_high: number | null;
    fifty_two_week_low: number | null;
    bid: number | null;
    ask: number | null;
    trailing_eps: number | null;
    trailing_pe: number | null;
    db: DBStock | null;
}


interface AssetErrorResponse {
    detail: string;
    statusCode: number;
}

// Server action to fetch asset by ticker
export async function getAssetByTicker(ticker: string): Promise<{ data?: Asset; error?: AssetErrorResponse }> {
    try {
        const response = await AxiosInstance.get<Asset>(`/assets/${ticker}`);
        console.log(response.data);
        return {data: response.data};
    } catch (error) {
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status || 500;
            const errorMessage = error.response?.data?.detail || 'An unknown error occurred';

            return {
                error: {
                    detail: errorMessage,
                    statusCode
                }
            };
        }

        return {
            error: {
                detail: 'An unexpected error occurred',
                statusCode: 500
            }
        };
    }
}