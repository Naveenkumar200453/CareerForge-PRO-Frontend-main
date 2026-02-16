import axios from "axios"
import { useUpgrade } from "@/context/UpgradeContext"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.data?.upgrade) {
      window.dispatchEvent(new Event("show-upgrade"))
    }
    return Promise.reject(err)
  }
)
