"use client"

import { useEffect, useRef } from "react"

// Shared types
interface ChartData {
  value: number
  label: string
  color?: string
}

interface ChartProps {
  darkMode?: boolean
  data?: ChartData[] | number[]
  labels?: string[]
  width?: number
  height?: number
}

// Shared utility functions
const useResponsiveCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const updateDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [ref])
}

// Line Chart Component
export function LineChart({ darkMode = false, data = [], labels = [] }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useResponsiveCanvas(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Validate data
    const numericData = Array.isArray(data) ? data.map(d => typeof d === 'number' ? d : d.value) : []
    if (numericData.length === 0) return

    // Calculate scales
    const maxValue = Math.max(...numericData) * 1.1
    const xStep = (width - padding * 2) / (numericData.length - 1)
    const yScale = (height - padding * 2) / maxValue

    // Theme colors using CSS variables
    const textColor = darkMode ? "var(--muted-foreground)" : "var(--muted-foreground)"
    const gridColor = darkMode ? "var(--border)" : "var(--border)"
    const lineColor = "var(--primary)"
    const areaColor = darkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.15)"
    const pointBorderColor = "var(--primary)"
    const pointFillColor = darkMode ? "var(--card)" : "var(--card)"

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = gridColor
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = textColor
    ctx.font = "12px sans-serif"

    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2)) / 5
      const value = Math.round((i * maxValue) / 5)
      ctx.fillText(`${value.toLocaleString()}`, padding - 10, y)

      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = textColor

    for (let i = 0; i < labels.length; i++) {
      const x = padding + i * xStep
      ctx.fillText(labels[i], x, height - padding + 10)
    }

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 3
    ctx.moveTo(padding, height - padding - numericData[0] * yScale)

    for (let i = 1; i < numericData.length; i++) {
      const x = padding + i * xStep
      const y = height - padding - numericData[i] * yScale
      ctx.lineTo(x, y)
    }

    ctx.stroke()

    // Draw points
    for (let i = 0; i < numericData.length; i++) {
      const x = padding + i * xStep
      const y = height - padding - numericData[i] * yScale

      ctx.beginPath()
      ctx.fillStyle = pointFillColor
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.strokeStyle = pointBorderColor
      ctx.lineWidth = 2
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw area under the line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding - numericData[0] * yScale)

    for (let i = 1; i < numericData.length; i++) {
      const x = padding + i * xStep
      const y = height - padding - numericData[i] * yScale
      ctx.lineTo(x, y)
    }

    ctx.lineTo(padding + (numericData.length - 1) * xStep, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()

    ctx.fillStyle = areaColor
    ctx.fill()

  }, [darkMode, data, labels])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// Bar Chart Component
export function BarChart({ darkMode = false, data = [], labels = [] }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useResponsiveCanvas(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Validate data
    const numericData = Array.isArray(data) ? data.map(d => typeof d === 'number' ? d : d.value) : []
    if (numericData.length === 0) return

    // Calculate scales
    const maxValue = Math.max(...numericData) * 1.2
    const barWidth = (width - padding * 2) / numericData.length - 20
    const yScale = (height - padding * 2) / maxValue

    // Theme colors using CSS variables
    const textColor = darkMode ? "var(--muted-foreground)" : "var(--muted-foreground)"
    const gridColor = darkMode ? "var(--border)" : "var(--border)"
    const barColors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)"
    ]

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = gridColor
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = textColor
    ctx.font = "12px sans-serif"

    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * (height - padding * 2)) / 5
      const value = Math.round((i * maxValue) / 5)
      ctx.fillText(`${value}%`, padding - 10, y)

      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw bars and labels
    for (let i = 0; i < numericData.length; i++) {
      const barHeight = numericData[i] * yScale
      const x = padding + i * ((width - padding * 2) / numericData.length) + 10
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = barColors[i % barColors.length]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = textColor
      ctx.fillText(labels[i], x + barWidth / 2, height - padding + 10)

      // Draw value
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillStyle = textColor
      ctx.fillText(`${numericData[i]}%`, x + barWidth / 2, y - 5)
    }
  }, [darkMode, data, labels])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

interface PieChartProps {
  darkMode?: boolean
  data: Record<string, number>
  colors?: string[]
}

export function PieChart({ darkMode = false, data = {} }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useResponsiveCanvas(canvasRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Use theme colors
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)"
    ]

    // Convert Record<string, number> to chart data format
    const chartData = Object.entries(data)
      .map(([label, value], index) => ({
        label,
        value,
        color: colors[index % colors.length]
      }))
      .filter(item => item.value > 0) // Remove zero values
      .sort((a, b) => b.value - a.value) // Sort by value (descending)

    if (chartData.length === 0) return

    // Calculate total
    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    // Theme colors
    const textColor = "var(--muted-foreground)"
    const labelColor = darkMode ? "var(--card-foreground)" : "var(--card-foreground)"

    // Draw pie slices
    let startAngle = -Math.PI / 2
    chartData.forEach((item) => {
      const sliceAngle = (item.value / total) * Math.PI * 2
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()

      // Add percentage label if slice is big enough
      if (sliceAngle > 0.2) {
        const midAngle = startAngle + sliceAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius

        ctx.fillStyle = labelColor
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "bold 14px sans-serif"
        ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY)
      }

      startAngle = endAngle
    })

    // Draw legend
    const legendX = width - 150
    const legendY = 40
    const legendItemHeight = 25

    chartData.forEach((item, index) => {
      const y = legendY + index * legendItemHeight

      // Draw color swatch
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, y, 20, 20)

      // Draw label
      ctx.fillStyle = textColor
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.font = "14px sans-serif"

      // Truncate long labels
      const displayLabel = item.label.length > 15
        ? `${item.label.substring(0, 12)}...`
        : item.label

      ctx.fillText(displayLabel, legendX + 30, y + 10)

      // Draw value
      ctx.textAlign = "right"
      ctx.fillText(item.value.toLocaleString(), width - 20, y + 10)
    })
  }, [darkMode, data])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Pie chart visualization"
    />
  )
}