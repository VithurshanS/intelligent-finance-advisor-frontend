"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "./charts"
import { BudgetApi } from "@/lib/budget-lib/budget_api"
import type { BudgetGoal, BudgetGoalCreate, BudgetGoalUpdate, PredictionResponse } from "@/lib/budget-lib/budget_api"

export function FinancialGoals({ userId }: { userId: string }) {
  const [goals, setGoals] = useState<BudgetGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null)

  const [newGoal, setNewGoal] = useState<Omit<BudgetGoalCreate, 'user_id'>>({
    name: "",
    category: "",
    target_amount: 0,
    current_amount: 0,
    start_date: new Date().toISOString().split('T')[0],
    end_date: "",
  })

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await BudgetApi.getBudgetGoals(userId)
        setGoals(data)
      } catch (err) {
        setError("Failed to fetch goals")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchPredictions = async () => {
      try {
        const data = await BudgetApi.getPredictions(userId)
        setPredictions(data)
      } catch (err) {
        console.error("Failed to fetch predictions", err)
      }
    }

    fetchGoals()
    fetchPredictions()
  }, [userId])

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newGoal.name || !newGoal.target_amount || !newGoal.end_date || !newGoal.category) {
      setError("Please fill all required fields")
      return
    }

    try {
      const goalToCreate: BudgetGoalCreate = {
        ...newGoal,
        user_id: userId
      }
      const createdGoal = await BudgetApi.createBudgetGoal(goalToCreate)
      setGoals([...goals, createdGoal])

      setNewGoal({
        name: "",
        category: "",
        target_amount: 0,
        current_amount: 0,
        start_date: new Date().toISOString().split('T')[0],
        end_date: "",
      })
      setError(null)
    } catch (err) {
      setError("Failed to create goal")
      console.error(err)
    }
  }

  const handleUpdateGoal = async (goalId: number, updates: BudgetGoalUpdate) => {
    try {
      const updatedGoal = await BudgetApi.updateBudgetGoal(goalId, updates)
      setGoals(goals.map(goal => goal.id === goalId ? updatedGoal : goal))
    } catch (err) {
      setError("Failed to update goal")
      console.error(err)
    }
  }

  const handleDeleteGoal = async (goalId: number) => {
    try {
      await BudgetApi.deleteBudgetGoal(goalId)
      setGoals(goals.filter(goal => goal.id !== goalId))
    } catch (err) {
      setError("Failed to delete goal")
      console.error(err)
    }
  }

  const categories = ["Savings", "Housing", "Education", "Retirement", "Lifestyle", "Debt", "Other"]
  const priorities = ["High", "Medium", "Low"]

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Goals</CardTitle>
            <CardDescription>Your financial targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{goals.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              Across {new Set(goals.map((g) => g.category)).size} categories
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Progress</CardTitle>
            <CardDescription>All goals combined</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${goals.reduce((sum, g) => sum + g.current_amount, 0).toLocaleString()} / $
              {goals.reduce((sum, g) => sum + g.target_amount, 0).toLocaleString()}
            </div>
            <Progress
              value={(goals.reduce((sum, g) => sum + g.current_amount, 0) /
                goals.reduce((sum, g) => sum + g.target_amount, 0) * 100)}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Milestone</CardTitle>
            <CardDescription>Upcoming achievement</CardDescription>
          </CardHeader>
          <CardContent>
            {goals.length > 0 ? (
              <>
                <div className="text-3xl font-bold">{goals[0].name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {Math.round((goals[0].current_amount / goals[0].target_amount) * 100)}% complete,
                  due in {new Date(goals[0].end_date).toLocaleDateString()}
                </div>
              </>
            ) : (
              <div className="text-gray-500">No goals set</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="add">Add Goal</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-6">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>
                        {goal.category}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Target date: {new Date(goal.end_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{Math.round((goal.current_amount / goal.target_amount) * 100)}% complete</span>
                      <span>${(goal.target_amount - goal.current_amount).toLocaleString()} remaining</span>
                    </div>
                    <Progress value={(goal.current_amount / goal.target_amount) * 100} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateGoal(goal.id, {
                      current_amount: goal.current_amount + (goal.target_amount * 0.1)
                    })}
                  >
                    Add 10%
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    Delete Goal
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set a new financial target</CardDescription>
            </CardHeader>
            <CardContent>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="e.g., New Car Fund"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Amount ($)</Label>
                    <Input
                      id="target"
                      type="number"
                      min="0"
                      step="100"
                      value={newGoal.target_amount || ""}
                      onChange={(e) => setNewGoal({ ...newGoal, target_amount: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Amount ($)</Label>
                    <Input
                      id="current"
                      type="number"
                      min="0"
                      step="100"
                      value={newGoal.current_amount || ""}
                      onChange={(e) => setNewGoal({ ...newGoal, current_amount: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={newGoal.start_date}
                      onChange={(e) => setNewGoal({ ...newGoal, start_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">Target Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={newGoal.end_date}
                      onChange={(e) => setNewGoal({ ...newGoal, end_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Goal
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Goal Projections</CardTitle>
              <CardDescription>Estimated timeline for your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Projected Growth</h3>
                  <LineChart data={goals.} labels={goals.map((g) => g.name)} />
                </div>

                {predictions?.financial_advice && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Financial Advice</h3>
                    <p>{predictions.financial_advice}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Goal Timeline</h3>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-[15%] w-0.5 bg-gray-200" />

                    <div className="space-y-8">
                      {goals.map((goal) => (
                        <div key={goal.id} className="relative pl-8 ml-[15%]">
                          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500" />
                          <div className="p-4 bg-white rounded-lg border">
                            <div className="font-medium">{goal.name}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(goal.end_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}