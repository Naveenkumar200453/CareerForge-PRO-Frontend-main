"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShieldCheck,
  Users,
  BarChart3,
  Settings,
  ScrollText,
} from "lucide-react"
import { motion } from "framer-motion"
import clsx from "clsx"

/* =========================
   SIDEBAR ITEMS
========================= */
const items = [
  { label: "Dashboard", href: "/admin", icon: ShieldCheck },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Revenue", href: "/admin/revenue", icon: BarChart3 },
  { label: "Audit Logs", href: "/admin/audit", icon: ScrollText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="
        hidden md:flex w-72 flex-col
        border-r border-white/10
        bg-background/75 backdrop-blur-3xl
        shadow-[0_0_120px_rgba(99,102,241,0.25)]
        relative overflow-hidden
      "
    >
      {/* 🌈 SIDEBAR AURA */}
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-indigo-500/25 via-purple-500/25 to-pink-500/25
          blur-3xl
        "
      />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative px-6 py-6"
      >
        <motion.h2
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="
            text-xl font-extrabold tracking-tight
            bg-gradient-to-r
            from-indigo-400 via-purple-400 to-pink-400
            bg-[length:300%_300%]
            bg-clip-text text-transparent
          "
        >
          Admin Control
        </motion.h2>
        <p className="mt-1 text-xs text-muted-foreground">
          System command surface
        </p>
      </motion.div>

      {/* ================= NAV ================= */}
      <nav className="relative flex-1 space-y-1 px-3">
        {items.map(({ label, href, icon: Icon }, index) => {
          const active = pathname === href

          return (
            <Link key={href} href={href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className={clsx(
                  `
                  relative flex items-center gap-3
                  rounded-2xl px-4 py-3
                  transition-all duration-300
                  `,
                  active
                    ? `
                      bg-gradient-to-r
                      from-indigo-500 via-purple-500 to-pink-500
                      text-white
                      shadow-[0_0_35px_rgba(236,72,153,0.65)]
                    `
                    : `
                      text-muted-foreground
                      hover:bg-muted/40
                    `
                )}
              >
                {/* ACTIVE GLOW BAR */}
                {active && (
                  <motion.span
                    layoutId="active-rail"
                    className="
                      absolute left-0 top-1/2 -translate-y-1/2
                      h-8 w-1.5 rounded-full
                      bg-gradient-to-b
                      from-indigo-400 to-pink-400
                      shadow-[0_0_20px_rgba(236,72,153,0.8)]
                    "
                  />
                )}

                {/* ICON */}
                <motion.div
                  animate={
                    active
                      ? { scale: [1, 1.15, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 2,
                    repeat: active ? Infinity : 0,
                  }}
                >
                  <Icon size={18} />
                </motion.div>

                {/* LABEL */}
                <span className="font-semibold tracking-tight">
                  {label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* ================= FOOTER ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative px-6 py-4 text-xs text-muted-foreground"
      >
        <div className="h-px w-full bg-white/10 mb-3" />
        Secure Admin Mode
      </motion.div>
    </aside>
  )
}
