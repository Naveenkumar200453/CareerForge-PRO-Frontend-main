"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PricingCards from "./PricingCards"

export default function UpgradeModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold">
            Upgrade Your Plan 🚀
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Unlock AI rewrites, ATS insights & PDF exports
          </p>
        </DialogHeader>

        <div className="p-6">
          <PricingCards />
        </div>
      </DialogContent>
    </Dialog>
  )
}
