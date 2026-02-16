"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import UsersTable from "@/components/admin/UsersTable"
import { motion } from "framer-motion"

const API = "http://localhost:5000/admin"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)

  /* =========================
     FETCH USERS
  ========================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.post(
          API,
          { action: "users" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUsers(res.data.users)
      } catch (err) {
        console.error("Fetch users failed", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  /* =========================
     PROMOTE USER
  ========================= */
  const promoteUser = async (userId: string) => {
    try {
      setProcessing(userId)
      const token = localStorage.getItem("token")

      await axios.post(
        API,
        { action: "promote", targetUserId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setUsers(prev =>
        prev.map(u =>
          u._id === userId
            ? { ...u, role: "admin", adminLevel: "normal" }
            : u
        )
      )
    } catch (err) {
      console.error("Promote failed", err)
    } finally {
      setProcessing(null)
    }
  }

  /* =========================
     DEMOTE ADMIN
  ========================= */
  const demoteUser = async (userId: string) => {
    try {
      setProcessing(userId)
      const token = localStorage.getItem("token")

      await axios.post(
        API,
        { action: "demote", targetUserId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setUsers(prev =>
        prev.map(u =>
          u._id === userId
            ? { ...u, role: "user", adminLevel: null }
            : u
        )
      )
    } catch (err) {
      console.error("Demote failed", err)
    } finally {
      setProcessing(null)
    }
  }

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl font-semibold tracking-wide"
        >
          Loading user matrix…
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* 🌌 FLOATING NEON BACKGROUND */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -120, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-64 -left-64 h-[700px] w-[700px] rounded-full bg-indigo-500/30 blur-[320px]"
      />
      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 140, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 -right-64 h-[700px] w-[700px] rounded-full bg-purple-500/30 blur-[320px]"
      />

      {/* ================= MAIN ================= */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 space-y-8"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            👥 User Management
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Promote, demote and monitor platform access in real time
          </p>
        </motion.div>

        {/* USERS TABLE */}
        <UsersTable
          users={users}
          onPromote={promoteUser}
          onDemote={demoteUser}
          processingId={processing}
        />
      </motion.div>
    </div>
  )
}
