"use client"

import { ReactNode } from "react"
import AdminSidebar from "@/components/AdminSidebar"
import { Toaster } from "sonner"
import { motion } from "framer-motion"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden
      bg-gradient-to-br from-background via-muted/40 to-background">

      {/* 🌌 BACKGROUND AURAS */}
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute -top-40 -left-40
        h-[520px] w-[520px] rounded-full
        bg-indigo-500/30 blur-[140px]"
      />

      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="pointer-events-none absolute bottom-0 right-0
        h-[520px] w-[520px] rounded-full
        bg-pink-500/25 blur-[160px]"
      />

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN PANEL */}
      <motion.main
        initial={{ opacity: 0, x: 60, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          relative z-10 flex-1
          px-6 py-6
          overflow-y-auto
        "
      >
        {/* ✨ INNER GLOW BORDER */}
        <div
          className="
            relative h-full w-full rounded-3xl
            border border-white/10
            bg-background/70 backdrop-blur-2xl
            shadow-[0_0_80px_rgba(99,102,241,0.25)]
            p-6
          "
        >
          {/* subtle animated sheen */}
          <motion.div
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="
              pointer-events-none absolute inset-0
              rounded-3xl
              bg-gradient-to-r
              from-transparent via-white/6 to-transparent
            "
          />

          {children}
        </div>

        {/* 🔔 TOASTS */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "bg-background/90 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.35)]",
            },
          }}
        />
      </motion.main>
    </div>
  )
}
