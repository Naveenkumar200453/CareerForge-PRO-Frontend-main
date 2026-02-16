"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { motion } from "framer-motion"

const COLORS = ["#6366F1", "#A855F7", "#EC4899"]

export default function UserChart({ stats }: any) {
  const data = [
    { name: "Free", value: stats.totalUsers - stats.proUsers - stats.ultimateUsers },
    { name: "Pro", value: stats.proUsers },
    { name: "Ultimate", value: stats.ultimateUsers },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl bg-background/70 backdrop-blur-2xl p-6 shadow-2xl"
    >
      <h3 className="mb-4 text-lg font-bold">User Distribution</h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
