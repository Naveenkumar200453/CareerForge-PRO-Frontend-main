"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useUser } from "@/hooks/useUser"

export default function BillingButton() {
  const { user } = useUser()

  const openPortal = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/billing/portal`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )

    window.location.href = res.data.url
  }

  return (
    <Button variant="outline" onClick={openPortal}>
      Manage Subscription
    </Button>
  )
}
