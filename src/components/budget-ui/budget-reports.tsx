"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart } from "./charts"

export function BudgetReports() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2023-04-01", category: "Housing", description: "Rent", amount: 1200 },
    { id: 2, date: "2023-04-02", category: "Food", description: "Groceries", amount: 150 },
    { id: 3, date: "2023-04-05", category: "Transportation", description: "Gas", amount: 45 },
    { id: 4, date: "2023-04-10", category: "Utilities", description: "Electricity", amount: 85 },
    { id: 5, date: "2023-04-15", category: "Entertainment", description: "Movie tickets", amount: 30 },
  ])

  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
  })

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newExpense.category || !newExpense.description || !newExpense.amount) {
      return
    }

    setExpenses([
      ...expenses,
      {
        id: expenses.length + 1,
        date: newExpense.date,
        category: newExpense.category,
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
      },
    ])

    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      amount: "",
    })
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categories = [
    "Housing",
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Shopping",
    "Other",
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Expenses</CardTitle>
            <CardDescription className="text-muted-foreground">Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Budget Remaining</CardTitle>
            <CardDescription className="text-muted-foreground">Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$850.00</div>
            <div className="text-sm text-warning mt-1">28% of budget remaining</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Largest Expense</CardTitle>
            <CardDescription className="text-muted-foreground">Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Housing</div>
            <div className="text-sm text-muted-foreground mt-1">$1,200.00 (42% of total)</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4 bg-secondary p-1 rounded-lg border border-border">
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Expense List
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Add Transaction
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription className="text-muted-foreground">Track your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border overflow-hidden">
                <div className="grid grid-cols-5 bg-secondary p-4 font-medium">
                  <div>Date</div>
                  <div>Category</div>
                  <div className="col-span-2">Description</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y divide-border">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="grid grid-cols-5 p-4">
                      <div>{new Date(expense.date).toLocaleDateString()}</div>
                      <div>{expense.category}</div>
                      <div className="col-span-2">{expense.description}</div>
                      <div className="text-right">${expense.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Add New Transaction</CardTitle>
              <CardDescription className="text-muted-foreground">Record your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger id="category" className="bg-background">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Transaction
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription className="text-muted-foreground">Understand your spending patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
                  <PieChart data={{}} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Monthly Trends</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Housing</span>
                      <span className="font-medium">$1,200.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Food</span>
                      <span className="font-medium">$450.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Transportation</span>
                      <span className="font-medium">$250.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Utilities</span>
                      <span className="font-medium">$180.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Entertainment</span>
                      <span className="font-medium">$120.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-border">
                Download Expense Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}