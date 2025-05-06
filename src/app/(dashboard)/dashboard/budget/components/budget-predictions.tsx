"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowUpRight, TrendingUp, TrendingDown, LineChartIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LineChart } from "./charts"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/actions/auth"

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

interface BudgetPredictionProps {
  userId: string
}

export function BudgetPredictions({ userId }: BudgetPredictionProps) {
  const [data, setData] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const result = await fetch(process.env.NEXT_PUBLIC_API_URL + `/predictions/?user_id=${userId}`)
        const responseData = await result.json()
        console.log(responseData)
        setData(responseData)
      } catch (error) {
        console.error("Error fetching predictions:", error)
      } finally {
        setLoading(false)
      }

    }
    fetchPredictions()
  }, [])

  if (loading) {
    return <div className="text-white">Loading predictions...</div>
  }

  if (!data) {
    return <div className="text-white">No prediction data available</div>
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
      <Alert className="bg-blue-900/30 border-blue-800/30">
        <AlertCircle className="h-4 w-4 text-blue-400" />
        <AlertTitle className="text-white">Budget Predictions</AlertTitle>
        <AlertDescription className="text-gray-300">
          These predictions are based on your historical financial data and current spending patterns.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Cash Flow Forecast</CardTitle>
            <CardDescription className="text-gray-300">Projected cash flow for the next month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              ${(data.predictions.income_next_month - data.predictions.expense_next_month).toFixed(2)}
            </div>
            <p className="text-gray-300 mt-2">Predicted for next month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Savings Opportunity</CardTitle>
            <CardDescription className="text-gray-300">Potential savings next week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              ${(data.predictions.income_next_week - data.predictions.expense_next_week).toFixed(2)}
            </div>
            <p className="text-gray-300 mt-2">Could be saved or used to pay debt</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights">
        <TabsList className="mb-4 bg-gray-700 p-1 rounded-lg">
          <TabsTrigger
            value="insights"
            className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Recommendations
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
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
                <Card key={i} className="bg-gray-800 border-gray-700 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center text-white">
                          {isPositive ? (
                            isIncome ? (
                              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                            ) : (
                              <TrendingUp className="h-5 w-5 mr-2 text-red-400" />)
                          ) : (
                            isIncome ? (
                              <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
                            ) : (
                              <TrendingDown className="h-5 w-5 mr-2 text-green-400" />
                            ))}
                          {prediction.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">{prediction.category} • {prediction.timeFrame}</CardDescription>
                      </div>
                      <Badge
                        variant={isPositive ? "default" : "destructive"}
                        className={
                          isPositive
                            ? (isIncome
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700")
                            : (
                              isIncome
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                            )
                        }
                      >
                        {isPositive ? (isIncome ? "Positive" : "Negative") : (isIncome ? "Negative" : "Positive")} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">Predicted value: ${prediction.value.toFixed(2)}</p>
                    {isPositive ? (
                      isIncome ? (
                        <p className="text-green-400 text-sm mt-1">Expected inflow</p>) :
                        (<p className="text-red-400 text-sm mt-1">Expected outlow</p>)
                    )
                      : (
                        isIncome ? (
                          <p className="text-red-400 text-sm mt-1">Expected outflow</p>) : (
                          <p className="text-green-400 text-sm mt-1">Expected inflow</p>
                        )
                      )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Financial Recommendations</CardTitle>
              <CardDescription className="text-gray-300">
                AI-powered suggestions to improve your finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {data.financial_advice.daily_actions && (
                  <div className="p-4 border border-gray-600 rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-green-400 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1 text-white">Daily Actions</div>
                        <div className="text-sm text-gray-300">{data.financial_advice.daily_actions}</div>
                      </div>
                    </div>
                  </div>
                )}

                {data.financial_advice.weekly_actions && (
                  <div className="p-4 border border-gray-600 rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1 text-white">Weekly Actions</div>
                        <div className="text-sm text-gray-300">{data.financial_advice.weekly_actions}</div>
                      </div>
                    </div>
                  </div>
                )}

                {data.financial_advice.monthly_actions && (
                  <div className="p-4 border border-gray-600 rounded-lg">
                    <div className="flex items-start">
                      <ArrowUpRight className="h-5 w-5 mr-2 text-purple-400 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1 text-white">Monthly Actions</div>
                        <div className="text-sm text-gray-300">{data.financial_advice.monthly_actions}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Alert className="bg-red-900/30 border-red-600/30 border">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertTitle className="text-white">Potential Risks</AlertTitle>
                <AlertDescription className="text-gray-300">
                  {data.financial_advice.risks}
                </AlertDescription>
              </Alert>

              <Alert className="bg-green-900/30 border-green-600/30 border">
                <LineChartIcon className="h-4 w-4 text-green-400" />
                <AlertTitle className="text-white">Long Term Insights</AlertTitle>
                <AlertDescription className="text-gray-300">
                  {data.financial_advice.long_term_insights}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Budget Goals</CardTitle>
              <CardDescription className="text-gray-300">
                Recommended financial targets based on your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.budget_goals?.map((goal, i) => (
                <div key={i} className="p-4 border border-gray-600 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {goal.time_period.replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      {goal.description && (
                        <p className="text-sm text-gray-300 mt-1">{goal.description}</p>
                      )}
                    </div>
                    {goal.amount && (
                      <Badge className="bg-blue-600">
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