'use client'

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

interface OverviewProps {
  data: {
    name: string
    blogs: number
    projects: number
  }[]
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{ background: '#333', border: 'none' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend />
        <Bar
          dataKey="blogs"
          name="Blogs"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="projects"
          name="Projects"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          className="fill-emerald-500"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
