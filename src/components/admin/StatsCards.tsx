"use client"

import { motion } from "framer-motion"
import { Users, Crown, Sparkles } from "lucide-react"

export default function StatsCards({ stats }: any) {
  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      label: "Pro Users",
      value: stats.proUsers,
      icon: Crown,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Ultimate Users",
      value: stats.ultimateUsers,
      icon: Sparkles,
      gradient: "from-pink-500 to-orange-400",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.06 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient}
          p-6 text-white shadow-[0_0_40px_rgba(0,0,0,0.4)]`}
        >
          <motion.div
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-white/10 blur-2xl"
          />

          <div className="relative flex items-center gap-4">
            <card.icon size={34} />
            <div>
              <p className="text-sm uppercase tracking-widest opacity-80">
                {card.label}
              </p>
              <p className="text-3xl font-extrabold">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
