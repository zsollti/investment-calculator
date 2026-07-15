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

interface GrowthChartProps {
  data: YearlyDataPoint[]
}

function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="growth-chart">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -4 }} />
          <YAxis tickFormatter={(value: number) => formatCurrency(value, true)} width={90} />
          <Tooltip
            formatter={(value, name) => [formatCurrency(Number(value)), name]}
            labelFormatter={(year) => `Year ${year}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            name="Portfolio value"
            stroke="#2f6f4f"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="contributed"
            name="Total contributed"
            stroke="#8a8a8a"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GrowthChart
