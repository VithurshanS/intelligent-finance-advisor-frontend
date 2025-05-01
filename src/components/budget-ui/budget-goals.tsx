"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "./charts"

export function BudgetGoals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2023-12-31",
      priority: "High",
      category: "Savings",
    },
    {
      id: 2,
      name: "Down Payment",
      target: 50000,
      current: 15000,
      deadline: "2025-06-30",
      priority: "Medium",
      category: "Housing",
    },
    {
      id: 3,
      name: "Vacation Fund",
      target: 3000,
      current: 1200,
      deadline: "2023-08-15",
      priority: "Low",
      category: "Lifestyle",
    },
    {
      id: 4,
      name: "Retirement",
      target: 1000000,
      current: 120000,
      deadline: "2050-01-01",
      priority: "High",
      category: "Retirement",
    },
  ])

  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    deadline: "",
    priority: "",
    category: "",
  })

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newGoal.name || !newGoal.target || !newGoal.deadline || !newGoal.priority || !newGoal.category) {
      return
    }

    setGoals([
      ...goals,
      {
        id: goals.length + 1,
        name: newGoal.name,
        target: Number.parseFloat(newGoal.target),
        current: Number.parseFloat(newGoal.current) || 0,
        deadline: newGoal.deadline,
        priority: newGoal.priority,
        category: newGoal.category,
      },
    ])

    setNewGoal({
      name: "",
      target: "",
      current: "",
      deadline: "",
      priority: "",
      category: "",
    })
  }

  const categories = ["Savings", "Housing", "Education", "Retirement", "Lifestyle", "Debt", "Other"]
  const priorities = ["High", "Medium", "Low"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Goals</CardTitle>
            <CardDescription className="text-muted-foreground">Your financial targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{goals.length}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Across {new Set(goals.map((g) => g.category)).size} categories
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Progress</CardTitle>
            <CardDescription className="text-muted-foreground">All goals combined</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${goals.reduce((sum, g) => sum + g.current, 0).toLocaleString()} / $
              {goals.reduce((sum, g) => sum + g.target, 0).toLocaleString()}
            </div>
            <Progress
              value={(goals.reduce((sum, g) => sum + g.current, 0) / goals.reduce((sum, g) => sum + g.target, 0)) * 100}
              className="h-2 mt-2 bg-muted"
              indicatorclassname="bg-primary"
            />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Milestone</CardTitle>
            <CardDescription className="text-muted-foreground">Upcoming achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Vacation Fund</div>
            <div className="text-sm text-muted-foreground mt-1">40% complete, due in 4 months</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4 bg-secondary p-1 rounded-lg border border-border">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Active Goals
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Add Goal
          </TabsTrigger>
          <TabsTrigger
            value="projections"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Projections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="space-y-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="bg-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {goal.category} • {goal.priority} Priority
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target date: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                      <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                    </div>
                    <Progress
                      value={(goal.current / goal.target) * 100}
                      className="h-2 bg-muted"
                      indicatorclassname="bg-primary"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="border-border">
                    Update Progress
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit Goal
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription className="text-muted-foreground">Set a new financial target</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="e.g., New Car Fund"
                    className="bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
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
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}
                    >
                      <SelectTrigger id="priority" className="bg-background">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Amount ($)</Label>
                    <Input
                      id="target"
                      type="number"
                      min="0"
                      step="100"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Amount ($)</Label>
                    <Input
                      id="current"
                      type="number"
                      min="0"
                      step="100"
                      value={newGoal.current}
                      onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Goal
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Goal Projections</CardTitle>
              <CardDescription className="text-muted-foreground">Estimated timeline for your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Projected Growth</h3>
                  <LineChart />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Goal Timeline</h3>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-[15%] w-0.5 bg-border" />

                    <div className="space-y-8">
                      <div className="relative pl-8 ml-[15%]">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-okay" />
                        <div className="p-4 bg-secondary rounded-lg border border-border">
                          <div className="font-medium">Vacation Fund</div>
                          <div className="text-sm text-muted-foreground">August 2023</div>
                        </div>
                      </div>

                      <div className="relative pl-8 ml-[15%]">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-okay" />
                        <div className="p-4 bg-secondary rounded-lg border border-border">
                          <div className="font-medium">Emergency Fund</div>
                          <div className="text-sm text-muted-foreground">December 2023</div>
                        </div>
                      </div>

                      <div className="relative pl-8 ml-[15%]">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-warning" />
                        <div className="p-4 bg-secondary rounded-lg border border-border">
                          <div className="font-medium">Down Payment</div>
                          <div className="text-sm text-muted-foreground">June 2025</div>
                        </div>
                      </div>

                      <div className="relative pl-8 ml-[15%]">
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-info" />
                        <div className="p-4 bg-secondary rounded-lg border border-border">
                          <div className="font-medium">Retirement</div>
                          <div className="text-sm text-muted-foreground">January 2050</div>
                        </div>
                      </div>
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