"use client"

import { motion } from "framer-motion"
import StatsCards from "@/components/admin/StatsCards"
import UserChart from "@/components/admin/UserChart"
import { useAdminStats } from "@/hooks/useAdminStats"

/* =========================
   COSMIC ADMIN BACKDROP++
========================= */
function AdminGlow() {
  return (
    <>
      {/* BACK LAYER */}
      <motion.div
        animate={{ x: [0, 180, 0], y: [0, -160, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-80 -left-80
          h-[820px] w-[820px] rounded-full
          bg-indigo-500/35 blur-[420px]"
      />

      <motion.div
        animate={{ x: [0, -200, 0], y: [0, 180, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 -right-80
          h-[820px] w-[820px] rounded-full
          bg-purple-500/35 blur-[420px]"
      />

      {/* FRONT LAYER */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, 140, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/3
          h-[820px] w-[820px] rounded-full
          bg-pink-500/35 blur-[420px]"
      />

      {/* GRAIN / NOISE */}
      <div
        className="pointer-events-none absolute inset-0
          opacity-[0.04] mix-blend-overlay
          bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]
          [background-size:3px_3px]"
      />
    </>
  )
}

export default function AdminPage() {
  const { stats, loading } = useAdminStats()

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
        <AdminGlow />
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.45, 1, 0.45],
            filter: ["blur(0px)", "blur(0.6px)", "blur(0px)"],
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="relative z-10 text-lg sm:text-xl
            font-semibold tracking-wide text-muted-foreground"
        >
          Initializing Admin Control Matrix…
        </motion.div>
      </div>
    )
  }

  /* =========================
     ❗ FALLBACK (NO STATS)
  ========================= */
  if (!stats) {
    return (
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <AdminGlow />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="relative z-10 text-center"
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-extrabold
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              bg-clip-text text-transparent"
          >
            Admin Systems Offline
          </motion.h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Unable to load admin statistics. Please check authentication or server status.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-10 py-14">
      <AdminGlow />

      {/* =========================
         MAIN GLASS PANEL++
      ========================= */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 mx-auto max-w-7xl
          rounded-[2.8rem] border border-white/10
          bg-background/75 backdrop-blur-[48px]
          p-6 sm:p-10 lg:p-14
          shadow-[0_0_260px_rgba(99,102,241,0.25)]"
      >
        {/* SHIMMER FRAME */}
        <motion.div
          animate={{ opacity: [0.12, 0.42, 0.12] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="pointer-events-none absolute inset-0
            rounded-[2.8rem]
            bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-pink-500/25"
        />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative mb-12"
        >
          <motion.h1
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="text-3xl sm:text-4xl lg:text-5xl
              font-extrabold tracking-tight
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              bg-[length:300%_300%] bg-clip-text text-transparent"
          >
            Admin Dashboard
          </motion.h1>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Real-time platform analytics, user intelligence, and system command surface
          </p>
        </motion.div>

        {/* STATS */}
        <StatsCards stats={stats} />

        {/* USER CHART */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16"
        >
          <UserChart stats={stats} />
        </motion.div>
      </motion.div>
    </div>
  )
}
