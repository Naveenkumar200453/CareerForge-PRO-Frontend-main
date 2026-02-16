"use client"

import axios from "axios"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "1 Resume",
      "Limited ATS Scan",
      "No PDF Export",
    ],
    disabled: true,
  },
  {
    name: "Pro",
    price: "₹699 / 6 month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    highlight: true,
    features: [
      "Unlimited Resumes",
      "AI Rewrite",
      "ATS Heatmap",
      "PDF Export",
    ],
  },
  {
    name: "Ultimate",
    price: "₹999 / 12 month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ULTIMATE_PRICE_ID!,
    features: [
      "Everything in Pro",
      "Cover Letters",
      "Priority AI",
    ],
  },
]

export default function PricingCards() {
  const handleCheckout = async (priceId: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/billing/checkout`,
      { priceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    window.location.href = res.data.url
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map(plan => (
        <div
          key={plan.name}
          className={`rounded-2xl border p-6 shadow ${
            plan.highlight
              ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
              : "bg-background"
          }`}
        >
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="mt-2 text-2xl font-extrabold">{plan.price}</p>

          <ul className="mt-4 space-y-2 text-sm">
            {plan.features.map(f => (
              <li key={f} className="flex items-center gap-2">
                <Check size={16} />
                {f}
              </li>
            ))}
          </ul>

          {!plan.disabled && (
            <Button
              className="mt-6 w-full rounded-full"
              onClick={() => handleCheckout(plan.priceId)}
            >
              Upgrade
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
