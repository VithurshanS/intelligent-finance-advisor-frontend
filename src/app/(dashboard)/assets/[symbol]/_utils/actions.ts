'use server';

import AxiosInstance from "@/lib/server-fetcher";
import {AxiosError} from "axios";

// TypeScript interfaces based on the Pydantic models
interface DBStock {
    in_db?: boolean;
    status?: string;
    asset_id?: number;
    risk_score?: number;
    risk_score_updated?: string;
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
    prev_close?: number;
    open_price?: number;
    last_price?: number;
    day_high?: number;
    day_low?: number;
    volume?: number;
    avg_volume?: number;
    beta?: number;
    market_cap?: number;
    fifty_two_week_high?: number;
    fifty_two_week_low?: number;
    bid?: number;
    ask?: number;
    trailing_eps?: number;
    trailing_pe?: number;
    db?: DBStock;
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