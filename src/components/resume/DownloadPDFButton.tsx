"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useResume } from "@/context/ResumeContext"
import { useUpgradeGuard } from "@/hooks/useUpgradeGuard"
import axios from "axios"
import { useState } from "react"
import { Download, Lock } from "lucide-react"

export default function DownloadPDFButton() {
  const { user } = useAuth()
  const { resume } = useResume()
  const { guard } = useUpgradeGuard()
  const [loading, setLoading] = useState(false)

  const isLocked = user?.plan === "free"

  const downloadPDF = async () => {
    if (!user) return

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/resumes/${resume._id}/pdf`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const blob = new Blob([res.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "CareerForge-Resume.pdf"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      if (guard(err)) return
      alert("Failed to generate PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={downloadPDF}
      disabled={isLocked || loading}
      className="gap-2 rounded-full"
      variant={isLocked ? "outline" : "default"}
    >
      {isLocked ? <Lock size={16} /> : <Download size={16} />}
      {isLocked
        ? "Upgrade to Download"
        : loading
        ? "Generating..."
        : "Download PDF"}
    </Button>
  )
}
