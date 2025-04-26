
"use client";

import React from "react";
import { useRouter } from "next/navigation"; // import the useRouter hook
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useActionState } from "react";
import { optimizePortfolio } from "@/actions/profile";
import { outputForResults} from "@/lib/types/profile";

const SAMPLE_TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA", "JPM", "V", "WMT"];

const initialState: outputForResults = {
    success: false,
    message: "",
    data: undefined,
};

export default function PortfolioOptimizationPage() {
    const [selectedTickers, setSelectedTickers] = React.useState<string[]>([]);
    const [state, formAction, pending] = useActionState(optimizePortfolio, initialState);
    const router = useRouter();  // useRouter hook for navigation

    const handleTickerSelect = (ticker: string) => {
        if (!selectedTickers.includes(ticker)) {
            setSelectedTickers([...selectedTickers, ticker]);
        }
    };

    const handleRemoveTicker = (tickerToRemove: string) => {
        setSelectedTickers(selectedTickers.filter((ticker) => ticker !== tickerToRemove));
    };

    React.useEffect(() => {
        if (state.success && state.data) {
            const encodedData = encodeURIComponent(JSON.stringify(state.data));
            router.push(`/dashboard/portfolio/results?data=${encodedData}`); // manually redirect to results page
        }
    }, [state.success, state.data, router]);

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/portfolio" className="text-foreground font-medium">
                            Portfolio
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Portfolio Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <input type="hidden" name="tickers" value={JSON.stringify(selectedTickers)} />

                        <div className="space-y-2">
                            <Label htmlFor="tickers">Select Tickers</Label>
                            <Select onValueChange={handleTickerSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stocks" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SAMPLE_TICKERS.filter((ticker) => !selectedTickers.includes(ticker)).map((ticker) => (
                                        <SelectItem key={ticker} value={ticker}>
                                            {ticker}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {selectedTickers.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedTickers.map((ticker) => (
                                        <div
                                            key={ticker}
                                            className="bg-secondary px-2 py-1 rounded-md text-sm flex items-center gap-2"
                                        >
                                            {ticker}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTicker(ticker)}
                                                className="hover:text-destructive"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" name="startDate" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input id="endDate" name="endDate" type="date" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="numPortfolios">Number of Portfolios</Label>
                                <Input id="numPortfolios" name="numPortfolios" type="number" min="1" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="years">Investment Years</Label>
                                <Input id="years" name="years" type="number" step="0.1" min="0.1" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="investmentAmount">Investment Amount</Label>
                                <Input id="investmentAmount" name="investmentAmount" type="number" min="0" step="0.01" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="targetAmount">Target Amount</Label>
                                <Input id="targetAmount" name="targetAmount" type="number" min="0" step="0.01" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={pending}>
                            {pending ? "Optimizing..." : "Optimize Portfolio"}
                        </Button>
                    </form>

                    {!state.success && state.message && (
                        <p className="mt-4 text-destructive">{state.message}</p>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
