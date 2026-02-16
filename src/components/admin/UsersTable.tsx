"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, ShieldCheck, ShieldOff, UserX } from "lucide-react"
import { useState } from "react"
import { RoleBadge, PlanBadge } from "./Badges"
import { useAuth } from "@/context/AuthContext"
import { adminApi } from "@/lib/adminApi"
import { toast } from "sonner"
import { can } from "@/lib/adminPermissions"

export default function UsersTable({ users }: any) {
  const { user: currentUser } = useAuth()
  const [query, setQuery] = useState("")
  const [loadingId, setLoadingId] = useState<string | null>(null)

  /* =========================
     FILTER
  ========================= */
  const filtered = users.filter((u: any) =>
    [u.email, u.name].join(" ").toLowerCase().includes(query.toLowerCase())
  )

  /* =========================
     ACTIONS (LIVE)
  ========================= */
  const promote = async (userId: string) => {
    try {
      setLoadingId(userId)
      await adminApi.post("/admin", {
        action: "promote",
        targetUserId: userId,
      })
      toast.success("🚀 User promoted to admin")
      window.location.reload()
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Promotion failed")
    } finally {
      setLoadingId(null)
    }
  }

  const demote = async (userId: string) => {
    try {
      setLoadingId(userId)
      await adminApi.post("/admin", {
        action: "demote",
        targetUserId: userId,
      })
      toast.success("⚠ Admin demoted")
      window.location.reload()
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Demotion failed")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 90, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="
        relative rounded-[2.75rem]
        bg-background/70 backdrop-blur-3xl
        p-8
        border border-white/10
        shadow-[0_0_180px_rgba(99,102,241,0.45)]
        overflow-hidden
      "
    >
      {/* 🌈 AURA LAYERS */}
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="
          pointer-events-none absolute inset-0
          rounded-[2.75rem]
          bg-gradient-to-r
          from-indigo-500/30 via-purple-500/30 to-pink-500/30
          blur-3xl
        "
      />

      {/* ================= HEADER ================= */}
      <div className="relative mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold tracking-tight"
        >
          👥 Users Control Matrix
        </motion.h3>

        <motion.div
          whileHover={{ scale: 1.04 }}
          whileFocus={{ scale: 1.05 }}
          className="relative w-full sm:w-96"
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
            size={18}
          />
          <input
            placeholder="Search users or emails…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="
              w-full rounded-full
              bg-muted/40
              pl-12 pr-4 py-3 text-sm
              outline-none
              focus:ring-2 focus:ring-indigo-500
              shadow-inner
              transition
            "
          />
        </motion.div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-4">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Plan</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filtered.map((u: any, i: number) => {
                const isSelf = currentUser?._id === u._id
                const isSuperAdminTarget =
                  u.role === "admin" && u.adminLevel === "super"

                return (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.015,
                      boxShadow:
                        "0 0 40px rgba(99,102,241,0.35)",
                    }}
                    className="
                      border-t border-border/40
                      hover:bg-muted/30
                      transition-all
                    "
                  >
                    <td className="py-4 font-semibold">
                      {u.name || "—"}
                    </td>

                    <td className="truncate max-w-[260px]">
                      {u.email}
                    </td>

                    <td>
                      <RoleBadge role={u.role} adminLevel={u.adminLevel} />
                    </td>

                    <td>
                      <PlanBadge plan={u.plan} />
                    </td>

                    <td className="text-right">
                      <div className="flex justify-end gap-3">
                        {/* PROMOTE */}
                        {can(currentUser, "promote_admin") &&
                          u.role !== "admin" && (
                            <motion.button
                              whileHover={{ scale: 1.25, rotate: 8 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={loadingId === u._id}
                              onClick={() => promote(u._id)}
                              className="
                                rounded-full p-3
                                bg-indigo-500/25 hover:bg-indigo-500/40
                                text-indigo-400
                                shadow-[0_0_30px_rgba(99,102,241,0.7)]
                              "
                              title="Promote to admin"
                            >
                              <ShieldCheck size={18} />
                            </motion.button>
                          )}

                        {/* DEMOTE */}
                        {can(currentUser, "demote_admin") &&
                          u.role === "admin" &&
                          !isSuperAdminTarget &&
                          !isSelf && (
                            <motion.button
                              whileHover={{ scale: 1.25, rotate: -8 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={loadingId === u._id}
                              onClick={() => demote(u._id)}
                              className="
                                rounded-full p-3
                                bg-red-500/25 hover:bg-red-500/40
                                text-red-400
                                shadow-[0_0_30px_rgba(239,68,68,0.7)]
                              "
                              title="Demote admin"
                            >
                              <ShieldOff size={18} />
                            </motion.button>
                          )}

                        {/* FUTURE */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="
                            rounded-full p-3
                            bg-muted/20 text-muted-foreground
                            cursor-not-allowed
                          "
                          title="Disable user (coming soon)"
                        >
                          <UserX size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
