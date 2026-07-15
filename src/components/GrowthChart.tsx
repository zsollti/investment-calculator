import { useEffect, useRef } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MAX_VISIBLE_YEARS, MIN_VISIBLE_YEARS } from '../calculations'
import type { YearlyDataPoint } from '../types'
import type { CurrencyCode } from '../currency'
import { formatCurrency } from '../format'
import './GrowthChart.css'

interface GrowthChartProps {
  data: YearlyDataPoint[]
  currency: CurrencyCode
  visibleYears: number
  onZoom: (deltaYears: number) => void
}

function GrowthChart({ data, currency, visibleYears, onZoom }: GrowthChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onZoomRef = useRef(onZoom)
  onZoomRef.current = onZoom

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY === 0) return
      onZoomRef.current(e.deltaY > 0 ? 1 : -1)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="growth-chart" ref={containerRef}>
      <p className="growth-chart-hint">
        Showing years 0–{visibleYears} &middot; scroll on the chart to zoom ({MIN_VISIBLE_YEARS}–{MAX_VISIBLE_YEARS} years)
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="year"
            stroke="var(--text)"
            label={{ value: 'Years', position: 'insideBottom', offset: -4, fill: 'var(--text)' }}
          />
          <YAxis
            stroke="var(--text)"
            tickFormatter={(value: number) => formatCurrency(value, currency, true)}
            width={90}
          />
          <Tooltip
            formatter={(value, name) => [formatCurrency(Number(value), currency), name]}
            labelFormatter={(year) => `Year ${year}`}
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-h)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            name="Portfolio value"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="contributed"
            name="Total contributed"
            stroke="var(--text)"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GrowthChart
