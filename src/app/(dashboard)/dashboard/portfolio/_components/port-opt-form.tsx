"use client"

import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Common stock tickers for demonstration
const SAMPLE_TICKERS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "META",
    "TSLA", "NVDA", "JPM", "V", "WMT"
];

export function PortfolioOptimizationForm() {
    const [selectedTickers, setSelectedTickers] = React.useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Portfolio Optimization</CardTitle>
    </CardHeader>
    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-2">
    <Label htmlFor="tickers">Select Tickers</Label>
    <Select>
    <SelectTrigger>
        <SelectValue placeholder="Select stocks" />
        </SelectTrigger>
        <SelectContent>
        {SAMPLE_TICKERS.map((ticker) => (
                <SelectItem key={ticker} value={ticker}>
            {ticker}
            </SelectItem>
))}
    </SelectContent>
    </Select>
    {selectedTickers.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
            {selectedTickers.map((ticker) => (
                    <div key={ticker} className="bg-secondary px-2 py-1 rounded-md text-sm">
                {ticker}
                </div>
    ))}
        </div>
    )}
    </div>

    <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
    <Label htmlFor="startDate">Start Date</Label>
    <Input
    id="startDate"
    type="date"
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="endDate">End Date</Label>
    <Input
    id="endDate"
    type="date"
    required
    />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
    <Label htmlFor="numPortfolios">Number of Portfolios</Label>
    <Input
    id="numPortfolios"
    type="number"
    min="1"
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="years">Investment Years</Label>
    <Input
    id="years"
    type="number"
    step="0.1"
    min="0.1"
    required
    />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
    <Label htmlFor="investmentAmount">Investment Amount</Label>
    <Input
    id="investmentAmount"
    type="number"
    min="0"
    step="0.01"
    required
    />
    </div>
    <div className="space-y-2">
    <Label htmlFor="targetAmount">Target Amount</Label>
    <Input
    id="targetAmount"
    type="number"
    min="0"
    step="0.01"
    required
    />
    </div>
    </div>

    <Button type="submit" className="w-full">
        Optimize Portfolio
    </Button>
    </form>
    </CardContent>
    </Card>
);
}