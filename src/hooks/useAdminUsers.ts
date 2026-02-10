"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export function useAdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setUsers(res.data.users)
      } catch (err) {
        console.error("Fetch users error", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, setUsers, loading }
}
