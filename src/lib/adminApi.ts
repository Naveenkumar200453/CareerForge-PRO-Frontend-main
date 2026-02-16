
import axios from "axios"

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
