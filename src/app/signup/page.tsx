"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Sparkles,
  MailCheck,
  RotateCcw,
  User,
} from "lucide-react"

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

export default function SignupPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""))
  const otpRefs = useRef<HTMLInputElement[]>([])

  const [resendTimer, setResendTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const otp = otpDigits.join("")

  /* =======================
     RESEND OTP TIMER
  ======================= */
  useEffect(() => {
    if (resendTimer === 0) return
    const interval = setInterval(() => {
      setResendTimer(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [resendTimer])

  /* =======================
     SEND OTP
  ======================= */
  const sendOTP = async () => {
    try {
      setLoading(true)
      setError("")
      await axios.post("http://localhost:5000/auth/send-otp", { email })
      setOtpSent(true)
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
      await axios.post("http://localhost:5000/auth/verify-otp", {
        email,
        otp,
      })
      setOtpVerified(true)
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     FINAL SIGNUP
  ======================= */
  const submitSignup = async () => {
  try {
    setLoading(true)
    setError("")

    const res = await axios.post(
      "http://localhost:5000/auth/complete-signup",
      {
        email,
        name,
        password,
      }
    )

    // 🔐 Store token
    localStorage.setItem("token", res.data.token)

    // 👤 Fetch fresh user
    const meRes = await axios.get("http://localhost:5000/auth/me", {
      headers: {
        Authorization: `Bearer ${res.data.token}`,
      },
    })

    const user = meRes.data

    // ✅ Update auth context
    setUser(user)

    // ✅ ROLE-BASED REDIRECT
    if (user.role === "admin") {
      router.replace("/admin")
    } else {
      router.replace("/account")
    }
  } catch (err: any) {
    setError(err.response?.data?.error || "Signup failed")
  } finally {
    setLoading(false)
  }
}



  /* =======================
     OTP INPUT HANDLERS
  ======================= */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const updated = [...otpDigits]
    updated[index] = value
    setOtpDigits(updated)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pasted)) return

    const updated = pasted.split("")
    setOtpDigits(updated)
    otpRefs.current[5]?.focus()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border bg-background/80 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            animate={otpVerified ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg"
          >
            {otpVerified ? <MailCheck /> : <Sparkles />}
          </motion.div>

          <h1 className="text-2xl font-extrabold">
            {otpSent ? "Verify your email" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {otpSent
              ? "Enter the 6-digit OTP sent to your email"
              : "Start building ATS-optimized resumes"}
          </p>
        </div>

        {/* FORM */}
        <div className="mt-8 space-y-5">
          {!otpSent && (
            <>
              <Input
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <Input
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          {/* OTP BOXES */}
          {otpSent && !otpVerified && (
            <div
              className="flex justify-center gap-3"
              onPaste={handleOtpPaste}
            >
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={el => {
                    if (el) otpRefs.current[i] = el
                  }}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  maxLength={1}
                  className="h-12 w-12 rounded-xl border text-center text-xl font-bold shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {/* ACTIONS */}
        <div className="mt-8 space-y-3">
          {!otpSent && (
            <Button
              onClick={sendOTP}
              disabled={loading || !name}
              className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
            >
              Verify Email
            </Button>
          )}

          {otpSent && !otpVerified && (
            <>
              <Button
                onClick={verifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              >
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
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </Button>
            </>
          )}

          {otpVerified && (
            <Button
              onClick={submitSignup}
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
            >
              Complete Signup
            </Button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
