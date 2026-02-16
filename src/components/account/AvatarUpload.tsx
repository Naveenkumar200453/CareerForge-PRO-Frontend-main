"use client"

import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { ReactNode, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react"

export default function AvatarUpload({
  children,
}: {
  children: ReactNode
}) {
  const { setUser } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const upload = async (file: File) => {
    try {
      setLoading(true)
      setSuccess(false)

      const formData = new FormData()
      formData.append("avatar", file)

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const avatarUrl = res.data.avatarUrl

      // 🔄 Update AuthContext
      setUser(prev =>
        prev ? { ...prev, avatarUrl } : prev
      )

      // ✨ Success pulse
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1500)
    } catch (err) {
      console.error("Avatar upload failed", err)
      alert("Avatar upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) upload(file)
        }}
      />

      {/* Clickable animated wrapper */}
      <motion.div
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="relative cursor-pointer"
      >
        {/* 🌈 Breathing glow ring */}
        <motion.div
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-xl"
        />

        {children}

        {/* ⏳ Loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Success pulse */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500/80 backdrop-blur-md"
            >
              <CheckCircle className="h-7 w-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📤 Floating upload icon */}
        {!loading && !success && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md"
          >
            <UploadCloud size={14} />
            Change avatar
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
