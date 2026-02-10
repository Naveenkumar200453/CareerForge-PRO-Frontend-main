"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { ShieldCheck } from "lucide-react"

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.post(
          "http://localhost:5000/admin",
          { action: "audit-logs" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setLogs(res.data.logs)
      } catch (err) {
        console.error("Audit logs fetch failed", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center animate-pulse">
        Loading audit logs…
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-indigo-400" />
        <h1 className="text-3xl font-extrabold">Audit Logs</h1>
      </div>

      <div className="rounded-3xl border border-white/10
        bg-background/70 backdrop-blur-xl
        shadow-[0_0_80px_rgba(99,102,241,0.25)]
        overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Actor</th>
              <th>Action</th>
              <th>Target</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <motion.tr
                key={log._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="border-t border-border/40 hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium">
                  {log.actor?.email || "System"}
                </td>

                <td className="font-semibold text-indigo-400">
                  {log.action}
                </td>

                <td className="truncate max-w-[220px]">
                  {log.target}
                </td>

                <td className="text-muted-foreground">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
