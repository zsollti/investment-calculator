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
import type { YearlyDataPoint } from '../types'
import { formatCurrency } from '../format'
import './GrowthChart.css'

interface GrowthChartProps {
  data: YearlyDataPoint[]
}

function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="growth-chart">
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
            tickFormatter={(value: number) => formatCurrency(value, true)}
            width={90}
          />
          <Tooltip
            formatter={(value, name) => [formatCurrency(Number(value)), name]}
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
