"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowUpRight, BookOpen, Lightbulb, TrendingUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FinancialAdvice() {
  const insights = [
    {
      title: "Increase Emergency Fund",
      description: "Your emergency fund is currently at 65% of the recommended amount. Consider allocating more to reach 3-6 months of expenses.",
      priority: "High",
      category: "Savings",
    },
    {
      title: "Diversify Investments",
      description: "Your portfolio is heavily weighted in technology stocks. Consider diversifying to reduce sector risk.",
      priority: "Medium",
      category: "Investments",
    },
    {
      title: "Optimize Tax Strategy",
      description: "You may benefit from tax-loss harvesting before year-end to offset capital gains.",
      priority: "Medium",
      category: "Taxes",
    },
    {
      title: "Reduce Dining Expenses",
      description: "Your dining out expenses are 35% higher than last month. This is an area where you could save more.",
      priority: "Low",
      category: "Expenses",
    },
  ]

  const articles = [
    {
      title: "Understanding Index Funds",
      description: "A beginner's guide to passive investing and why it works for most people.",
      category: "Investing",
      readTime: "5 min",
    },
    {
      title: "Emergency Fund Basics",
      description: "How much you need and where to keep your emergency savings.",
      category: "Savings",
      readTime: "4 min",
    },
    {
      title: "Debt Snowball vs. Avalanche",
      description: "Two effective strategies for paying off debt and which one is right for you.",
      category: "Debt",
      readTime: "7 min",
    },
    {
      title: "Retirement Planning 101",
      description: "Start planning for retirement no matter your age with these simple steps.",
      category: "Retirement",
      readTime: "8 min",
    },
  ]

  return (
    <div className="space-y-6">
      <Alert className="bg-secondary">
        <AlertCircle className="h-4 w-4 text-info" />
        <AlertTitle>Personalized Financial Insights</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Based on your financial data, we've generated personalized recommendations to help you optimize your finances.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="insights">
        <TabsList className="mb-4 bg-secondary">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="advisor">Advisor</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="space-y-6">
            {insights.map((insight, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-warning" />
                        {insight.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{insight.category}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        insight.priority === "High"
                          ? "destructive"
                          : insight.priority === "Medium"
                            ? "default"
                            : "outline"
                      }
                    >
                      {insight.priority} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{insight.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="border-border">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <Badge variant="outline" className="border-border">
                      {article.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground">{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {article.readTime} read
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Financial Learning Paths</CardTitle>
                <CardDescription className="text-muted-foreground">Structured courses to improve your financial literacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Investing Fundamentals</div>
                        <div className="text-sm text-muted-foreground">Learn the basics of investing and building wealth</div>
                      </div>
                      <Badge>Beginner</Badge>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="border-border">
                        Start Course
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Advanced Tax Strategies</div>
                        <div className="text-sm text-muted-foreground">
                          Optimize your tax situation and keep more of your money
                        </div>
                      </div>
                      <Badge>Intermediate</Badge>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="border-border">
                        Start Course
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Retirement Planning Mastery</div>
                        <div className="text-sm text-muted-foreground">Comprehensive strategies for a secure retirement</div>
                      </div>
                      <Badge>Advanced</Badge>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="border-border">
                        Start Course
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advisor">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Financial Advisor</CardTitle>
              <CardDescription className="text-muted-foreground">Get personalized advice from a financial expert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-secondary rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Schedule a Consultation</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with a certified financial advisor to get personalized advice tailored to your financial
                  situation.
                </p>
                <Button>Book Appointment</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-1">Portfolio Review</div>
                  <div className="text-sm text-muted-foreground">Get expert analysis of your investments</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-1">Retirement Planning</div>
                  <div className="text-sm text-muted-foreground">Ensure you're on track for retirement</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-1">Tax Optimization</div>
                  <div className="text-sm text-muted-foreground">Strategies to minimize your tax burden</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-medium mb-1">Estate Planning</div>
                  <div className="text-sm text-muted-foreground">Protect your assets for future generations</div>
                </div>
              </div>

              <Alert className="bg-secondary">
                <ArrowUpRight className="h-4 w-4 text-info" />
                <AlertTitle>Premium Feature</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Unlimited advisor consultations are available with our Premium plan. Upgrade today for comprehensive
                  financial guidance.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-border">
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}