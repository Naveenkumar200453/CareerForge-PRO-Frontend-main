"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    features: ["1 Resume", "Basic Templates"],
    disabled: true,
  },
  {
    name: "Pro",
    price: "₹699 / 6 months",
    priceId: "price_1SrDPAB8NmUZz3cKjb9Ceca1",
    features: [
      "Unlimited Resumes",
      "AI Rewrite",
      "ATS Score",
      "PDF Export",
    ],
    featured: true,
  },
  {
    name: "Ultimate",
    price: "₹999 / 12 months",
    priceId: "price_1SrDQ9B8NmUZz3cKQomO4b8q",
    features: [
      "Everything in Pro",
      "Cover Letters",
      "Priority AI",
    ],
  },
]

export default function PricingPage() {
  const { user } = useAuth()

  const startCheckout = async (priceId: string) => {
    const token = localStorage.getItem("token")

    const res = await axios.post(
      "http://localhost:5000/billing/checkout",
      { priceId },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    window.location.href = res.data.url
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 sm:px-6 py-20">
      {/* 🌌 FLOATING GLOWS */}
      <Glow color="indigo" />
      <Glow color="pink" delay />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="flex justify-center items-center gap-2 text-3xl sm:text-4xl font-extrabold">
          Simple, Transparent Pricing
          <Sparkles className="text-indigo-500 animate-pulse" />
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          Upgrade when you’re ready. Cancel anytime.
        </p>
      </motion.div>

      {/* PLANS */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const isCurrent =
            user?.plan === plan.name.toLowerCase()

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -14, scale: 1.05 }}
              className={`
                relative rounded-3xl p-8
                backdrop-blur-xl
                shadow-[0_0_60px_rgba(0,0,0,0.35)]
                ${
                  plan.featured
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : "bg-card/80 border border-border"
                }
              `}
            >
              {/* 🌟 FEATURED RING */}
              {plan.featured && (
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="pointer-events-none absolute inset-0 rounded-3xl
                  bg-gradient-to-r from-white/20 via-transparent to-white/20"
                />
              )}

              <h2 className="text-xl font-extrabold tracking-wide">
                {plan.name}
              </h2>

              <p className="mt-4 text-3xl font-extrabold">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={16} className="text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>

              {!plan.disabled && (
                <Button
                  onClick={() => startCheckout(plan.priceId!)}
                  disabled={isCurrent}
                  className={`
                    mt-8 w-full rounded-full
                    ${
                      plan.featured
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                    }
                    shadow-xl
                  `}
                >
                  {isCurrent ? "Current Plan" : "Upgrade"}
                </Button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* =========================
   GLOW ORBS
========================= */
function Glow({
  color,
  delay,
}: {
  color: "indigo" | "pink"
  delay?: boolean
}) {
  return (
    <motion.div
      animate={{
        x: [0, color === "indigo" ? 200 : -200, 0],
        y: [0, color === "indigo" ? -200 : 200, 0],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay ? 10 : 0,
      }}
      className={`
        pointer-events-none absolute
        ${
          color === "indigo"
            ? "bg-indigo-500/30"
            : "bg-pink-500/30"
        }
        -top-64 -left-64
        h-[700px] w-[700px]
        rounded-full blur-[300px]
      `}
    />
  )
}
