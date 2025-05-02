"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowUpRight, TrendingUp, TrendingDown, LineChartIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LineChart, BarChart } from "./charts"
import { useEffect, useState } from "react"

interface PredictionData {
  predictions: {
    income_next_day: number;
    income_next_week: number;
    income_next_month: number;
    expense_next_day: number;
    expense_next_week: number;
    expense_next_month: number;
    today_income: number;
    today_expense: number;
    this_week_income: number;
    this_week_expense: number;
    this_month_income: number;
    this_month_expense: number;
    income: Map<string, number>;
    expense: Map<string, number>;
  }
  financial_advice: {
    observations: string;
    daily_actions: string;
    weekly_actions: string;
    monthly_actions: string;
    risks: string;
    long_term_insights: string;
  }
  budget_goals: Array<{
    time_period: string;
    amount?: number;
    description?: string;
  }>
}

export function BudgetPredictions() {
  const [data, setData] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <div>Loading predictions...</div>
  }

  if (!data) {
    return <div>No prediction data available</div>
  }

  // Create prediction cards data
  const predictionCards = [
    {
      title: "Income Next Day",
      value: data.predictions.income_next_day,
      category: "Income",
      timeFrame: "Next Day",
      impact: data.predictions.income_next_day >= data.predictions.today_income ? "Positive" : "Negative"
    },
    {
      title: "Income Next Week",
      value: data.predictions.income_next_week,
      category: "Income",
      timeFrame: "Next Week",
      impact: data.predictions.income_next_week >= data.predictions.this_week_income ? "Positive" : "Negative"
    },
    {
      title: "Income Next Month",
      value: data.predictions.income_next_month,
      category: "Income",
      timeFrame: "Next Month",
      impact: data.predictions.income_next_month >= data.predictions.this_month_income ? "Positive" : "Negative"
    },
    {
      title: "Expense Next Day",
      value: data.predictions.expense_next_day,
      category: "Expense",
      timeFrame: "Next Day",
      impact: data.predictions.expense_next_day >= data.predictions.today_expense ? "Positive" : "Negative"
    },
    {
      title: "Expense Next Week",
      value: data.predictions.expense_next_week,
      category: "Expense",
      timeFrame: "Next Week",
      impact: data.predictions.expense_next_week >= data.predictions.this_week_expense ? "Positive" : "Negative"
    },
    {
      title: "Expense Next Month",
      value: data.predictions.expense_next_month,
      category: "Expense",
      timeFrame: "Next Month",
      impact: data.predictions.expense_next_month >= data.predictions.this_month_expense ? "Positive" : "Negative"
    }
  ]

  return (
    <div className="space-y-6">
      <Alert className="bg-secondary border-border">
        <AlertCircle className="h-4 w-4 text-info" />
        <AlertTitle>Budget Predictions</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          These predictions are based on your historical financial data and current spending patterns.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Cash Flow Forecast</CardTitle>
            <CardDescription className="text-muted-foreground">Projected cash flow for the next month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-okay">
              ${(data.predictions.income_next_month - data.predictions.expense_next_month).toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-2">Predicted for next month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Savings Opportunity</CardTitle>
            <CardDescription className="text-muted-foreground">Potential savings next week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              ${(data.predictions.income_next_week - data.predictions.expense_next_week).toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-2">Could be saved or used to pay debt</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights">
        <TabsList className="mb-4 bg-secondary p-1 rounded-lg border border-border">
          <TabsTrigger
            value="insights"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Recommendations
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Budget Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="space-y-6">
            {predictionCards.map((prediction, i) => {
              const isPositive = prediction.impact === "Positive";
              const isIncome = prediction.category === "Income";

              return (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {isPositive ? (
                            isIncome ? (
                              <TrendingUp className="h-5 w-5 mr-2 text-okay" />
                            ) : (
                              <TrendingUp className="h-5 w-5 mr-2 text-destructive" />)
                          ) : (
                            isIncome ? (
                              <TrendingDown className="h-5 w-5 mr-2 text-destructive" />
                            ) : (
                              <TrendingDown className="h-5 w-5 mr-2 text-okay" />
                            ))}
                          {prediction.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">{prediction.category} • {prediction.timeFrame}</CardDescription>
                      </div>
                      <Badge
                        variant={isPositive ? "default" : "destructive"}
                        className={
                          isPositive
                            ? (isIncome
                              ? "bg-okay hover:bg-okay/90"
                              : "bg-destructive hover:bg-destructive/90")
                            : (
                              isIncome
                                ? "bg-destructive hover:bg-destructive/90"
                                : "bg-okay hover:bg-okay/90"
                            )
                        }
                      >
                        {isPositive ? (isIncome ? "Positive" : "Negative") : (isIncome ? "Negative" : "Positive")} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Predicted value: ${prediction.value.toFixed(2)}</p>
                    {isPositive ? (
                      isIncome ? (
                        <p className="text-okay text-sm mt-1">Expected inflow</p>) :
                        (<p className="text-destructive text-sm mt-1">Expected outlow</p>)
                    )
                      : (
                        isIncome ? (
                          <p className="text-destructive text-sm mt-1">Expected outflow</p>) : (
                          <p className="text-okay text-sm mt-1">Expected inflow</p>
                        )
                      )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Financial Recommendations</CardTitle>
              <CardDescription className="text-muted-foreground">
                AI-powered suggestions to improve your finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {data.financial_advice.daily_actions && (
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-okay mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Daily Actions</div>
                        <div className="text-sm text-muted-foreground">{data.financial_advice.daily_actions}</div>
                      </div>
                    </div>
                  </div>
                )}

                {data.financial_advice.weekly_actions && (
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-info mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Weekly Actions</div>
                        <div className="text-sm text-muted-foreground">{data.financial_advice.weekly_actions}</div>
                      </div>
                    </div>
                  </div>
                )}

                {data.financial_advice.monthly_actions && (
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Monthly Actions</div>
                        <div className="text-sm text-muted-foreground">{data.financial_advice.monthly_actions}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Alert className="bg-destructive/10 border-destructive">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle>Potential Risks</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  {data.financial_advice.risks}
                </AlertDescription>
              </Alert>

              <Alert className="bg-okay/10 border-okay">
                <LineChartIcon className="h-4 w-4 text-okay" />
                <AlertTitle>Long Term Insights</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  {data.financial_advice.long_term_insights}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Budget Goals</CardTitle>
              <CardDescription className="text-muted-foreground">
                Recommended financial targets based on your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.budget_goals?.map((goal, i) => (
                <div key={i} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">
                        {goal.time_period.replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      )}
                    </div>
                    {goal.amount && (
                      <Badge className="bg-primary">
                        ${goal.amount.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}