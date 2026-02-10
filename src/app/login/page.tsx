"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import axios from "axios"
import {
  Eye,
  EyeOff,
  Sparkles,
  MailCheck,
  RotateCcw,
  Lock,
} from "lucide-react"

/* =======================
   API INSTANCE (FIX)
======================= */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
})

/* =======================
   Animated Background
======================= */
function AnimatedBackground() {
  return (
    <>
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-indigo-500/30 blur-[180px]"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 120, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 right-0 h-[480px] w-[480px] rounded-full bg-purple-500/30 blur-[180px]"
      />
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pink-500/30 blur-[180px]"
      />
    </>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [mode, setMode] = useState<"login" | "otp" | "reset">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  /* =======================
     OTP TIMER
  ======================= */
  useEffect(() => {
    if (resendTimer === 0) return
    const t = setInterval(() => setResendTimer(v => v - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  /* =======================
     LOGIN (FIXED)
  ======================= */
  const login = async () => {
  try {
    setLoading(true)
    setError("")

    const res = await api.post("/auth/login", { email, password })

    // 🔐 Persist token
    localStorage.setItem("token", res.data.token)

    // ✅ Attach token immediately
    api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`

    // ✅ Update auth context
    setUser(res.data.user)

    // ✅ ROLE-BASED REDIRECT
    if (res.data.user.role === "admin") {
      router.replace("/admin")
    } else {
      router.replace("/account")
    }
  } catch (err: any) {
    setError(err.response?.data?.error || "Login failed")
  } finally {
    setLoading(false)
  }
}


  /* =======================
     SEND OTP
  ======================= */
  const sendOTP = async () => {
    try {
      setLoading(true)
      setError("")
      await api.post("/auth/send-otp", { email })
      setMode("otp")
      setResendTimer(30)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     VERIFY OTP
  ======================= */
  const verifyOTP = async () => {
    try {
      setLoading(true)
      setError("")
      await api.post("/auth/verify-otp", { email, otp })
      setMode("reset")
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     RESET PASSWORD
  ======================= */
  const resetPassword = async () => {
  try {
    setLoading(true)
    setError("")

    const res = await api.post("/auth/reset-password", {
      email,
      password: newPassword,
    })

    localStorage.setItem("token", res.data.token)
    api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`

    setUser(res.data.user)

    // ✅ ROLE-BASED REDIRECT
    if (res.data.user.role === "admin") {
      router.replace("/admin")
    } else {
      router.replace("/account")
    }
  } catch (err: any) {
    setError(err.response?.data?.error || "Reset failed")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-md rounded-3xl border bg-background/80 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg">
            {mode === "login" && <Sparkles />}
            {mode === "otp" && <MailCheck />}
            {mode === "reset" && <Lock />}
          </div>
          <h1 className="text-2xl font-extrabold">
            {mode === "login" && "Welcome back"}
            {mode === "otp" && "Verify your email"}
            {mode === "reset" && "Set new password"}
          </h1>
        </div>

        {/* FORM */}
        <div className="mt-8 space-y-5">
          <Input
            placeholder="Email address"
            value={email}
            disabled={mode !== "login"}
            onChange={e => setEmail(e.target.value)}
          />

          {mode === "login" && (
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          {mode === "otp" && (
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength={6}
            />
          )}

          {mode === "reset" && (
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {/* ACTIONS */}
        <div className="mt-8 space-y-3">
          {mode === "login" && (
            <>
              <Button onClick={login} className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                Sign In
              </Button>

              <button
                onClick={sendOTP}
                className="w-full text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </>
          )}

          {mode === "otp" && (
            <>
              <Button onClick={verifyOTP} className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                Verify OTP
              </Button>

              <Button
                variant="ghost"
                disabled={resendTimer > 0}
                onClick={sendOTP}
                className="w-full gap-2"
              >
                <RotateCcw size={16} />
                {resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Resend OTP"}
              </Button>
            </>
          )}

          {mode === "reset" && (
            <Button
              onClick={resetPassword}
              className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white"
            >
              Reset & Login
            </Button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-primary">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
