"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export default function AdminStatCard({
    title,
    value,
    icon,
}: {
    title: string
    value: string
    icon: ReactNode
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-6 shadow-xl"
        >
            <div className="mb-2 text-sm text-muted-foreground">{title}</div>
            <div className="text-3xl font-extrabold">{value}</div>
            <div className="absolute right-4 top-4 opacity-20">{icon}</div>
        </motion.div>
    )
}