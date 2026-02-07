"use client"
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";

const GrowthChart = ({data}: {data ?: any[]}) => {
  const chartData = data || [];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#9ca3af" />
        <YAxis tickLine={false} axisLine={false} stroke="#9ca3af" />
        <Tooltip 
           contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
           itemStyle={{ color: "#e5e7eb" }}
        />
        <Area dataKey="amount" stroke="#8884d8" fill="url(#colorVisitors)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default GrowthChart;