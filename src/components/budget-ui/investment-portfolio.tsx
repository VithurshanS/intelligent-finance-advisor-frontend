"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, BarChart, LineChart } from "./charts"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function InvestmentPortfolio() {
  const [activeTab, setActiveTab] = useState("overview")

  const investments = [
    {
      name: "S&P 500 ETF",
      ticker: "VOO",
      value: 8240,
      allocation: 33.5,
      change: 12.4,
      risk: "Medium",
    },
    {
      name: "Tech Growth Fund",
      ticker: "QQQ",
      value: 5620,
      allocation: 22.9,
      change: 18.2,
      risk: "High",
    },
    {
      name: "Dividend Aristocrats",
      ticker: "NOBL",
      value: 4380,
      allocation: 17.8,
      change: 6.8,
      risk: "Medium",
    },
    {
      name: "Bond Fund",
      ticker: "AGG",
      value: 3750,
      allocation: 15.3,
      change: 2.1,
      risk: "Low",
    },
    {
      name: "Real Estate REIT",
      ticker: "VNQ",
      value: 2573,
      allocation: 10.5,
      change: 4.5,
      risk: "Medium-High",
    },
  ]

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0)

  const recommendations = [
    "Consider increasing your bond allocation for more stability",
    "Your tech exposure is relatively high, consider diversifying",
    "Your portfolio has a good mix of growth and income investments",
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Investments</CardTitle>
            <CardDescription>Current value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="text-sm text-okay mt-1">+8.7% overall return</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Contributions</CardTitle>
            <CardDescription>Recurring investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$500.00</div>
            <div className="text-sm text-muted-foreground mt-1">Next contribution: Apr 15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Profile</CardTitle>
            <CardDescription>Your investment style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Moderate Growth</div>
            <div className="text-sm text-muted-foreground mt-1">Medium risk tolerance</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current investment mix</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart darkMode={true} data={investments.map(inv => ({ value: inv.allocation, label: inv.name }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance by Asset</CardTitle>
                <CardDescription>Year-to-date returns</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
              <CardDescription>Current holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border">
                <div className="grid grid-cols-6 bg-muted p-4 font-medium">
                  <div className="col-span-2">Investment</div>
                  <div>Ticker</div>
                  <div>Value</div>
                  <div>Allocation</div>
                  <div>Performance</div>
                </div>
                <div className="divide-y divide-border">
                  {investments.map((investment, i) => (
                    <div key={i} className="grid grid-cols-6 p-4 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">{investment.name}</div>
                        <div className="text-sm text-muted-foreground">Risk: {investment.risk}</div>
                      </div>
                      <div>{investment.ticker}</div>
                      <div>${investment.value.toLocaleString()}</div>
                      <div>{investment.allocation}%</div>
                      <div
                        className={`flex items-center ${investment.change >= 0 ? "text-okay" : "text-destructive"}`}
                      >
                        {investment.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {investment.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Add Investment</Button>
              <Button>Rebalance Portfolio</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Historical returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Growth Over Time</h3>
                  <LineChart />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">1 Month</div>
                    <div className="text-2xl font-bold text-okay">+2.4%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">3 Months</div>
                    <div className="text-2xl font-bold text-okay">+5.8%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">1 Year</div>
                    <div className="text-2xl font-bold text-okay">+12.3%</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground">All Time</div>
                    <div className="text-2xl font-bold text-okay">+24.7%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Investment Recommendations</CardTitle>
              <CardDescription>Personalized advice for your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Portfolio Analysis</AlertTitle>
                <AlertDescription>
                  Based on your risk profile and financial goals, here are some recommendations to optimize your
                  portfolio.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 mt-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start p-4 bg-muted rounded-lg">
                    <ArrowUpRight className="h-5 w-5 mr-2 text-okay mt-0.5" />
                    <div>{rec}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Suggested Investments</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Total Market ETF (VTI)</div>
                        <div className="text-sm text-muted-foreground">Broad market exposure with low fees</div>
                      </div>
                      <Badge>Recommended</Badge>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">International Equity (VXUS)</div>
                        <div className="text-sm text-muted-foreground">Geographical diversification</div>
                      </div>
                      <Badge>Recommended</Badge>
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Short-Term Treasury (VGSH)</div>
                        <div className="text-sm text-muted-foreground">Lower risk fixed income</div>
                      </div>
                      <Badge>Consider</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule Advisor Consultation</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}