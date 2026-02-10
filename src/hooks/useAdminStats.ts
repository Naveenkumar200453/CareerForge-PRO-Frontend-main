"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export function useAdminStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        console.warn("Admin stats error: No auth token found")
        setError("Not authenticated")
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setStats(res.data.stats)
      } catch (err) {
        console.error("Admin stats error", err)
        setError("Failed to load admin stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
