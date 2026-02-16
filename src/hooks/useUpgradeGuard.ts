import { useState } from "react"

export function useUpgradeGuard() {
  const [showUpgrade, setShowUpgrade] = useState(false)

  const guard = (err: any) => {
    if (err?.response?.data?.upgrade) {
      setShowUpgrade(true)
      return true
    }
    return false
  }

  return {
    showUpgrade,
    closeUpgrade: () => setShowUpgrade(false),
    guard,
  }
}
