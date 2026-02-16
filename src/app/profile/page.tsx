"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Crown, Sparkles } from "lucide-react"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) router.replace("/account")
  }, [loading, user, router])

  /* =========================
     Loading State (Neon Spinner)
  ========================= */
  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent shadow-[0_0_40px_rgba(99,102,241,0.9)]"
        />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-black to-purple-950 px-6 py-28">

      {/* 🌌 Aurora Background */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-indigo-500/30 blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-500/30 blur-[200px]"
      />

      {/* 💠 PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_0_120px_rgba(0,0,0,0.7)]"
      >
        {/* ✨ Card Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

        {/* 🔮 Header */}
        <div className="relative z-10 flex items-center gap-5">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0_40px_rgba(236,72,153,0.8)]"
          >
            <Sparkles size={28} />
          </motion.div>

          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Account Profile
            </h1>
            <p className="text-sm text-white/60">
              Personal identity & subscription
            </p>
          </div>
        </div>

        {/* 📊 INFO GRID */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="relative z-10 mt-12 space-y-6"
        >
          {/* Name */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 transition"
          >
            <User className="text-indigo-400 group-hover:text-indigo-300" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Name
              </p>
              <p className="font-semibold text-white text-lg">
                {user.name || "—"}
              </p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 transition"
          >
            <Mail className="text-purple-400 group-hover:text-purple-300" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Email
              </p>
              <p className="font-semibold text-white text-lg break-all">
                {user.email}
              </p>
            </div>
          </motion.div>

          {/* Plan */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.04 }}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-6"
          >
            <Crown
              className={
                user.plan === "free"
                  ? "text-indigo-400"
                  : "text-yellow-400"
              }
            />
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Plan
              </p>

              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="relative inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-1.5 text-sm font-extrabold uppercase text-white shadow-[0_0_25px_rgba(168,85,247,0.8)]"
              >
                {user.plan}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
