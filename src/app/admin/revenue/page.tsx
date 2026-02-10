"use client"

import { motion } from "framer-motion"
import { BarChart3, CreditCard } from "lucide-react"

export default function AdminRevenuePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-extrabold tracking-tight">
        📈 Revenue Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: "₹0", icon: CreditCard },
          { label: "Monthly Revenue", value: "₹0", icon: BarChart3 },
          { label: "Pro Subs", value: "0", icon: BarChart3 },
          { label: "Ultimate Subs", value: "0", icon: BarChart3 },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-background/70 backdrop-blur-xl p-6 shadow-xl"
          >
            <card.icon className="mb-3 text-indigo-500" />
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-extrabold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-3xl bg-background/70 backdrop-blur-xl p-10 shadow-2xl text-center">
        <p className="text-muted-foreground">
          Stripe charts will appear here (MRR, ARR, churn, LTV).
        </p>
      </div>
    </motion.div>
  )
}
