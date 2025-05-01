"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, PieChart } from "@/components/budget-ui/charts"
import { BudgetReports } from "@/components/budget-ui/budget-reports"
import { BudgetGoals } from "@/components/budget-ui/budget-goals"
import { BudgetPredictions } from "@/components/budget-ui/budget-predictions"
import { AIChat } from "@/components/budget-ui/ai-chat"
import { DollarSign, TrendingUp, PieChartIcon, Target } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [summaryData, setSummaryData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    previouseIncome: 0,
    previousExpense: 0,
    previousBalance: 0,
    transactions: []
  })
  const [categories, setCategories] = useState<Record<string, number>>({})

  const handleSummaryValues = (val: number, val2: number) => {
    if (val2 == 0) {
      return ""
    }
    if (val > val2) {
      return "+" + ((val2 - val) / val2 * 100).toFixed(2) + "%"
    }
    return ((val2 - val) / val2 * 100).toFixed(2) + "%"
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-card p-1 rounded-lg border border-border">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Budget Goals</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Budget Reports</span>
            </TabsTrigger>
            <TabsTrigger
              value="predictions"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Predictions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Balance</CardTitle>
                  <CardDescription className="text-muted-foreground">Your current financial status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${summaryData.balance.toFixed(2)}</div>
                  <div
                    className="text-sm mt-1"
                    style={summaryData.balance > summaryData.previousBalance ?
                      { color: "var(--okay)" } : { color: "var(--destructive)" }}
                  >
                    {summaryData.previousBalance === 0 ? "" : `${handleSummaryValues(summaryData.balance, summaryData.previousBalance)}from last month`}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Savings</CardTitle>
                  <CardDescription className="text-muted-foreground">Your savings this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${summaryData.income.toFixed(2)}</div>
                  <div
                    className="text-sm mt-1"
                    style={summaryData.income > summaryData.previouseIncome ?
                      { color: "var(--okay)" } : { color: "var(--destructive)" }}
                  >
                    {summaryData.previouseIncome === 0 ? "" : `${handleSummaryValues(summaryData.income, summaryData.previouseIncome)}from last month`}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Expenses</CardTitle>
                  <CardDescription className="text-muted-foreground">Your expenses this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${summaryData.expense.toFixed(2)}</div>
                  <div
                    className="text-sm mt-1"
                    style={summaryData.expense <= summaryData.previousExpense ?
                      { color: "var(--okay)" } : { color: "var(--destructive)" }}
                  >
                    {summaryData.previousExpense === 0 ? "" : `${handleSummaryValues(summaryData.expense, summaryData.previousExpense)}from last month`}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription className="text-muted-foreground">Your financial health at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart data={summaryData.transactions!.map((t: { balance: any }) => t.balance)} labels={summaryData.transactions!.map((t: { date: any }) => t.date)} />
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription className="text-muted-foreground">Where your money is going</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart data={categories} />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border shadow-md">
              <CardHeader>
                <CardTitle>Financial Health Score</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Based on your spending, savings, and investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Overall Score</span>
                    <span className="font-medium">78/100</span>
                  </div>
                  <Progress value={78} className="h-2 bg-muted" indicatorclassname="bg-primary" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Savings</span>
                        <span className="font-medium">85/100</span>
                      </div>
                      <Progress value={85} className="h-2 bg-muted" indicatorclassname="bg-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Investments</span>
                        <span className="font-medium">72/100</span>
                      </div>
                      <Progress value={72} className="h-2 bg-muted" indicatorclassname="bg-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Debt Management</span>
                        <span className="font-medium">68/100</span>
                      </div>
                      <Progress value={68} className="h-2 bg-muted" indicatorclassname="bg-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <BudgetGoals />
          </TabsContent>

          <TabsContent value="reports">
            <BudgetReports />
          </TabsContent>

          <TabsContent value="predictions">
            <BudgetPredictions />
          </TabsContent>
        </Tabs>

        <AIChat />
      </main>
    </div>
  )
}