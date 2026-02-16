"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Loader2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

export default function EditProfileModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const save = async () => {
    try {
      setLoading(true)
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
        { name, password: password || undefined },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      setUser(res.data)
      onClose()
    } catch {
      alert("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 🌈 Floating Glow Orbs */}
          <motion.div
            animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-500/30 blur-[160px]"
          />
          <motion.div
            animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-pink-500/30 blur-[160px]"
          />

          {/* 💎 MODAL */}
          <motion.div
            initial={{ scale: 0.88, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card/80 p-8 backdrop-blur-xl shadow-[0_0_120px_rgba(0,0,0,0.6)]"
          >
            {/* ✨ Animated Border Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
            />

            {/* HEADER */}
            <div className="relative mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg"
                >
                  <Sparkles size={18} />
                </motion.div>
                <h2 className="text-xl font-extrabold text-foreground">
                  Edit Profile
                </h2>
              </div>

              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <X />
              </motion.button>
            </div>

            {/* FORM */}
            <div className="relative space-y-5">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="rounded-xl"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="password"
                  placeholder="New password (optional)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="rounded-xl"
                />
              </motion.div>
            </div>

            {/* ACTIONS */}
            <div className="relative mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  onClick={save}
                  disabled={loading}
                  className="gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 text-white shadow-xl hover:shadow-pink-500/40"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
