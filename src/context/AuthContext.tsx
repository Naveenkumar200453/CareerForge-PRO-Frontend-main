"use client"

import axios from "axios"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

/* =======================
   Types
======================= */
export type User = {
  _id: string
  name?: string
  email: string
  plan?: "free" | "pro" | "ultimate"
  avatarUrl?: string
  role?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

/* =======================
   Axios Instance
======================= */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
})

/* =======================
   Context
======================= */
const AuthContext = createContext<AuthContextType | null>(null)

/* =======================
   Provider
======================= */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false) // ✅ NEW

  useEffect(() => {
    if (typeof window === "undefined") return

    const token = localStorage.getItem("token")

    if (!token) {
      setHydrated(true) // ✅ NEW
      setLoading(false)
      return
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    api
      .get("/auth/me")
      .then(res => {
        setUser(res.data)
      })
      .catch(() => {
        localStorage.removeItem("token")
        delete api.defaults.headers.common.Authorization
        setUser(null)
      })
      .finally(() => {
        setHydrated(true) // ✅ NEW
        setLoading(false)
      })
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common.Authorization
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: !hydrated, // ✅ IMPORTANT FIX
        isAuthenticated: !!user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* =======================
   Hook
======================= */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
