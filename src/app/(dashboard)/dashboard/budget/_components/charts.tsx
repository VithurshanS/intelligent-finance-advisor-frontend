"use client"

import { useEffect, useRef } from "react"

// Shared types
// interface ChartDataPoint {
//   value: number
//   label: string
//   color?: string
// }

// interface ChartProps {
//   darkMode?: boolean
//   data?: ChartDataPoint[] | number[]
//   labels?: string[]
//   width?: number
//   height?: number
// }

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

export function LineChart({
  darkMode = false,
  data = [],
  labels = []
}: {
  darkMode?: boolean;
  data: number[];
  labels: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useResponsiveCanvas(canvasRef as React.RefObject<HTMLCanvasElement>);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Validate data
    if (data.length === 0 || labels.length === 0 || data.length !== labels.length) {
      return;
    }

    // Calculate scales - FIXED MAX VALUE CALCULATION
    const rawMax = Math.max(...data);
    const maxValue = rawMax === 0 ? 1 : rawMax * 1.1;
    const minValue = Math.min(0, Math.min(...data));
    const valueRange = Math.max(maxValue - minValue, 1);

    const availableHeight = height - padding * 2;
    const yScale = availableHeight / valueRange;
    const xStep = (width - padding * 2) / Math.max(data.length - 1, 1);

    // Formatting function for y-axis labels
    // const formatYLabel = (value: number) => {
    //   if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    //   if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    //   return value.toLocaleString();
    // };

    // Colors based on theme
    const textColor = darkMode ? "#d1d5db" : "#64748b";
    const gridColor = darkMode ? "#4b5563" : "#e2e8f0";
    const lineColor = data[data.length - 1] >= data[0] ? "#10b981" : "#ef4444";
    const areaColor = darkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)";
    const pointBorderColor = lineColor;
    const pointFillColor = darkMode ? "#374151" : "#ffffff";

    // Draw y-axis grid lines and labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;
    ctx.font = "12px sans-serif";

    for (let i = 0; i <= 5; i++) {
      const value = minValue + (i * valueRange) / 5;
      const y = height - padding - (i * availableHeight) / 5;

      // Grid line
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Label
      ctx.fillText(value.toLocaleString(), padding - 10, y);
    }

    // Draw x-axis
    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw x-axis labels
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const labelInterval = Math.ceil(labels.length / 10);
    for (let i = 0; i < labels.length; i++) {
      if (i % labelInterval === 0 || i === labels.length - 1) {
        const x = padding + i * xStep;
        ctx.fillText(labels[i], x, height - padding + 10);
      }
    }

    // Draw area under the line first (so line appears on top)
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (data[0] - minValue) * yScale);

    for (let i = 1; i < data.length; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (data[i] - minValue) * yScale;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(padding + (data.length - 1) * xStep, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = areaColor;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.moveTo(padding, height - padding - (data[0] - minValue) * yScale);

    for (let i = 1; i < data.length; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (data[i] - minValue) * yScale;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw points
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * xStep;
      const y = height - padding - (data[i] - minValue) * yScale;

      // Point fill
      ctx.beginPath();
      ctx.fillStyle = pointFillColor;
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Point border
      ctx.beginPath();
      ctx.strokeStyle = pointBorderColor;
      ctx.lineWidth = 2;
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.stroke();
    }

  }, [darkMode, data, labels]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
interface PieChartProps {
  darkMode?: boolean
  data: CategoryBreakdown[] // Category data from TransactionSummary
  colors?: string[]
}

const DEFAULT_COLORS = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#14b8a6", // Teal
]

export function PieChart({
  darkMode = false,
  data = [],
  colors = DEFAULT_COLORS
}: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useResponsiveCanvas(canvasRef as React.RefObject<HTMLCanvasElement>)

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
    const centerX = width / 4
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Convert CategoryBreakdown[] to chart data format
    const chartData = data
      .map((item, index) => ({
        label: item.category,
        value: item.amount,
        color: colors[index % colors.length]
      }))
      .filter(item => item.value > 0) // Remove zero values
      .sort((a, b) => b.value - a.value) // Sort by value (descending)

    if (chartData.length === 0) return

    // Calculate total
    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    // Theme colors
    const textColor = darkMode ? "#d1d5db" : "#64748b"
    const labelColor = darkMode ? "#ffffff" : "#000000"

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
    const legendX = width - 250
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
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(item.value)
      ctx.fillText(formattedValue, width - 20, y + 10)
    })
  }, [darkMode, data, colors])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Pie chart visualization"
    />
  )
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
}