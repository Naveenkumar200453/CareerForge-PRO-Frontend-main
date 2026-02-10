import { createContext, useContext, useState } from "react"

const UpgradeContext = createContext(null)

export function UpgradeProvider({ children }) {
  const [showUpgrade, setShowUpgrade] = useState(false)

  return (
    <UpgradeContext.Provider value={{ showUpgrade, setShowUpgrade }}>
      {children}
    </UpgradeContext.Provider>
  )
}

export const useUpgrade = () => useContext(UpgradeContext)
