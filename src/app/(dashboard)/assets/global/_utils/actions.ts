'use server'

import {calculateOffset} from "@/app/(dashboard)/assets/global/_utils/utils";
import AxiosInstance from "@/lib/server-fetcher";
import {ScreenerType} from "@/app/(dashboard)/assets/global/_utils/definitions";

// Define types for the response data based on the API response structure
export interface MinimalStockInfo {
    symbol: string;
    name: string;
    price: number;
    marketCap: number | null;
    analystRating: string | null;
    dividendYield: number | null;
    peRatio: number | null;
    priceChangePercent: number | null;
    exchange: string | null;
    market: string | null;
    riskLevel: string | null;
}

export interface ScreenerResponse {
    quotes: MinimalStockInfo[];
    start: number;
    count: number;
}

export interface ScreenerErrorResponse {
    success: false;
    error: string;
    statusCode: number;
}

export interface ScreenerSuccessResponse {
    success: true;
    data: ScreenerResponse;
}

export async function getScreenStocks({
                                          filter,
                                          page,
                                          result_per_page
                                      }: {
    filter: ScreenerType;
    page: number;
    result_per_page: number;
}): Promise<ScreenerSuccessResponse | ScreenerErrorResponse> {
    try {
        // Calculate the offset based on page and results per page
        const offset = calculateOffset(page, result_per_page);

        // Make the API request using path parameter for screen_type and query parameters for the rest
        const response = await AxiosInstance.get(`/assets/screen/${filter}`, {
            params: {
                offset: offset,
                size: result_per_page,
                minimal: true
            }
        });

        // Return success response with typed data
        return {
            success: true,
            data: response.data as ScreenerResponse
        };
    } catch (error) {
        // Handle error cases
        let errorMessage = 'Failed to fetch stock data';
        let statusCode = 500;

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        // If it's an Axios error with response data
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };

            if (axiosError.response?.status) {
                statusCode = axiosError.response.status;
            }

            if (axiosError.response?.data?.detail) {
                errorMessage = axiosError.response.data.detail;
            }
        }

        // Return structured error response
        return {
            success: false,
            error: errorMessage,
            statusCode
        };
    }
}