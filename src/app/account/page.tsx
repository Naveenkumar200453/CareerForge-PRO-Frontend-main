"use client"

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Crown,
  Mail,
  User as UserIcon,
  BarChart3,
  CreditCard,
  Pencil,
  Sparkles,
  Camera,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AvatarUpload from "@/components/account/AvatarUpload"
import EditProfileModal from "@/components/account/EditProfileModal"

/* =========================
   PAGE
========================= */
export default function AccountPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 sm:px-6 pt-24 sm:pt-28">
      {/* 🌌 GALAXY BACKDROP */}
      <Glow x={200} y={-200} color="indigo" />
      <Glow x={-200} y={200} color="pink" />

      {/* 💎 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="
          relative mx-auto max-w-3xl
          rounded-[2.5rem] sm:rounded-[3.25rem]
          border border-border
          bg-card/70
          p-6 sm:p-10
          backdrop-blur-3xl
          shadow-[0_0_240px_rgba(0,0,0,0.45)]
        "
      >
        {/* ✨ SHIMMER BORDER */}
        <motion.div
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="
            pointer-events-none absolute inset-0
            rounded-[2.5rem] sm:rounded-[3.25rem]
            bg-gradient-to-r
            from-indigo-500/25 via-purple-500/25 to-pink-500/25
          "
        />

        {/* ================= HEADER ================= */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
          {/* AVATAR */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="mx-auto sm:mx-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px]"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3.8, repeat: Infinity }}
              className="group relative"
            >
              <Avatar
                key={user.avatarUrl}
                className="
                  h-20 w-20 sm:h-24 sm:w-24
                  bg-background
                  shadow-[0_0_40px_rgba(236,72,153,0.6)]
                "
              >
                <AvatarImage
                  src={
                    user.avatarUrl
                      ? `${user.avatarUrl}?v=${Date.now()}`
                      : undefined
                  }
                />
                <AvatarFallback className="text-xl sm:text-2xl font-extrabold">
                  {user.email?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              {/* UPLOAD */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  rounded-full
                  bg-black/80 backdrop-blur-lg
                "
              >
                <AvatarUpload>
                  <motion.div
                    whileHover={{ scale: 1.35 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex flex-col items-center gap-1 text-white"
                  >
                    <Camera size={22} />
                    <span className="text-xs font-bold tracking-wide">
                      Change
                    </span>
                  </motion.div>
                </AvatarUpload>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* TITLE */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="flex justify-center sm:justify-start items-center gap-2 text-2xl sm:text-3xl font-extrabold">
              Account Overview
              <Sparkles className="text-indigo-500 animate-pulse" />
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              CareerForge Pro Control Center
            </p>
          </div>

          {/* EDIT */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto sm:mx-0"
          >
            <Button
              variant="outline"
              className="
                gap-2 rounded-full
                border-indigo-500/40
                shadow-[0_0_20px_rgba(99,102,241,0.4)]
              "
              onClick={() => setEditOpen(true)}
            >
              <Pencil size={16} />
              Edit
            </Button>
          </motion.div>
        </div>

        {/* ================= CONTENT ================= */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.18 } },
          }}
          className="mt-12 sm:mt-16 space-y-6"
        >
          <InfoRow icon={<UserIcon />} label="Name">
            {user.name || "—"}
          </InfoRow>

          <InfoRow icon={<Mail />} label="Email">
            {user.email}
          </InfoRow>

          {/* BILLING */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="
              relative overflow-hidden rounded-2xl
              border border-border
              bg-gradient-to-br
              from-indigo-500/15 via-purple-500/15 to-pink-500/15
              p-6
            "
          >
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              <Crown className="text-yellow-400 mx-auto sm:mx-0" />

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Current Plan
                </p>
                <p className="text-lg font-extrabold uppercase">
                  {user.plan}
                </p>
              </div>

              <Button
                onClick={() => router.push("/pricing")}
                className="
                  w-full sm:w-auto
                  gap-2 rounded-full
                  bg-gradient-to-r from-indigo-500 to-pink-500
                  text-white
                  shadow-[0_0_30px_rgba(236,72,153,0.6)]
                "
              >
                <CreditCard size={16} />
                Manage
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          {/* ANALYTICS */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border border-border bg-muted/40 p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="text-indigo-500" />
              <p className="text-sm font-semibold">Usage Analytics</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {["Resumes", "ATS Scans", "AI Credits"].map((label, i) => (
                <motion.div
                  key={label}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                >
                  <p className="text-3xl font-extrabold">0</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}

/* =========================
   HELPERS
========================= */
const item = {
  hidden: { y: 36, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

function InfoRow({ icon, label, children }: any) {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.05 }}
      className="
        flex items-center gap-4
        rounded-2xl border border-border
        bg-muted/40 p-6
      "
    >
      <div className="text-indigo-500">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="text-lg font-semibold">{children}</p>
      </div>
    </motion.div>
  )
}

function Glow({ x, y, color }: any) {
  return (
    <motion.div
      animate={{ x: [0, x, 0], y: [0, y, 0] }}
      transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      className={`
        pointer-events-none absolute
        ${color === "indigo" ? "bg-indigo-500/30" : "bg-pink-500/30"}
        -top-64 -left-64
        h-[640px] sm:h-[820px]
        w-[640px] sm:w-[820px]
        rounded-full blur-[300px]
      `}
    />
  )
}
