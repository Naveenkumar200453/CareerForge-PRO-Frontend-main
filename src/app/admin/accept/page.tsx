"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import axios from "axios"
import { ShieldCheck, XCircle } from "lucide-react"

export default function AcceptAdminInvitePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid invite link")
      return
    }

    const acceptInvite = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/accept-invite`,
          { token }
        )

        setStatus("success")
        setMessage("Admin access granted 🎉")

        setTimeout(() => {
          router.replace("/admin")
        }, 2000)
      } catch (err: any) {
        setStatus("error")
        setMessage(
          err.response?.data?.error ||
          "Invite expired or invalid"
        )
      }
    }

    acceptInvite()
  }, [token, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          rounded-3xl
          bg-background/80 backdrop-blur-xl
          p-10
          text-center
          shadow-[0_0_80px_rgba(99,102,241,0.35)]
          border border-white/10
          max-w-md
        "
      >
        {status === "loading" && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent"
            />
            <h2 className="text-xl font-bold">
              Verifying admin invite…
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <ShieldCheck
              size={48}
              className="mx-auto mb-4 text-emerald-400"
            />
            <h2 className="text-2xl font-extrabold">
              Welcome, Admin 👑
            </h2>
            <p className="mt-2 text-muted-foreground">
              Redirecting you to the admin dashboard…
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle
              size={48}
              className="mx-auto mb-4 text-red-400"
            />
            <h2 className="text-xl font-bold text-red-400">
              Invite Failed
            </h2>
            <p className="mt-2 text-muted-foreground">
              {message}
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}
