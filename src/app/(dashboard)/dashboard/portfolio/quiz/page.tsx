"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sparkles } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1) Pull everything back out of the URL
  const tickersParam = searchParams.get("tickers") || "[]";
  const tickers = JSON.parse(decodeURIComponent(tickersParam)) as string[];

  const years = searchParams.get("years") ?? "";
  const investmentAmount = searchParams.get("inv") ?? "";
  const targetAmount = searchParams.get("tgt") ?? "";

  const [score, setScore] = useState("");

  const handleCompleteQuiz = () => {
    const val = parseInt(score, 10);
    if (isNaN(val)) return;

    // 3) Rebuild the full query, adding the quiz score
    const params = new URLSearchParams({
      step: "4",
      risk_score_percent: val.toString(),
      tickers: JSON.stringify(tickers),
      years,
      inv: investmentAmount,
      tgt: targetAmount,
    });

    router.push(`/dashboard/portfolio?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/portfolio">
              Portfolio Optimization
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-foreground font-medium">
              Quiz
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Custom Risk Level Quiz</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Enter your desired risk level (0–100):</p>
          <Label htmlFor="riskScore">Risk Level</Label>
          <Input
            id="riskScore"
            type="number"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="e.g. 30"
          />
          <Button onClick={handleCompleteQuiz} disabled={score === ""}>
            Submit Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
