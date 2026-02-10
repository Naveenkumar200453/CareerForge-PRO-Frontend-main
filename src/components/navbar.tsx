"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Moon,
  Sun,
  Sparkles,
  FileText,
  Crown,
  User,
  CreditCard,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  LogIn,
  UserPlus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import clsx from "clsx"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { can } from "@/lib/adminPermissions"


export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const isAdmin = user?.role === "admin"

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark")

  const planStyles = {
    free: "from-slate-500 to-slate-700",
    pro: "from-indigo-500 via-purple-500 to-pink-500",
    ultimate: "from-pink-500 via-orange-500 to-yellow-400",
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="fixed top-0 z-[1000] w-full border-b border-white/10
        bg-background/75 backdrop-blur-3xl"
      >
        {/* 🌈 SUPER GLOW */}
        <motion.div
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-[80px]"
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* ========== BRAND ========== */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.18, rotate: -10 }}
              className="relative h-10 w-10"
            >
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full
                bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl"
              />
              <Image
                src="/logo.png"
                alt="CareerForge Pro"
                fill
                priority
                className="relative z-10 object-contain"
              />
            </motion.div>

            <motion.div
              className="hidden sm:flex items-center gap-1"
              whileHover={{ scale: 1.06 }}
            >
              <span className="text-xl font-extrabold">CareerForge</span>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              bg-clip-text text-xl font-extrabold text-transparent">
                Pro
              </span>
              <motion.div
                animate={{ rotate: [0, 25, -25, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-primary/80" />
              </motion.div>
            </motion.div>
          </Link>

          {/* ========== DESKTOP ACTIONS ========== */}
          <div className="hidden items-center gap-2 md:flex">
            {/* BUILDER */}
            <Button
              onClick={() => router.push("/builder")}
              size="sm"
              className={clsx(
                "relative gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0_45px_rgba(236,72,153,0.65)] overflow-hidden",
                pathname.startsWith("/builder") && "ring-2 ring-primary/70"
              )}
            >
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              <FileText size={16} />
              Resume Builder
            </Button>

            {/* PRICING */}
            <Button
              onClick={() => router.push("/pricing")}
              size="sm"
              variant="outline"
              className="rounded-full border-white/20 hover:border-pink-500"
            >
              <Crown size={16} className="mr-1 text-yellow-400" />
              Pricing
            </Button>

            {/* THEME */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <motion.div
                key={theme}
                initial={{ rotate: -120, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </motion.div>
            </Button>

            {/* ========== AVATAR DROPDOWN ========== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.18 }}>
                  <Avatar className="cursor-pointer ring-2 ring-primary/50">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
                        {user?.email?.[0]?.toUpperCase() ?? "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-60 rounded-2xl bg-background/95
                border border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.35)]"
              >
                {!user ? (
                  <>
                    <DropdownMenuItem onSelect={() => router.push("/login")}>
                      <LogIn size={16} /> Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/signup")}>
                      <UserPlus size={16} /> Sign up
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="truncate text-sm font-semibold">{user.email}</p>

                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                        className={clsx(
                          "mt-2 inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white",
                          planStyles[user.plan || "free"]
                        )}
                      >
                        {(user.plan || "free").toUpperCase()} PLAN
                      </motion.span>

                      {/* 👑 ADMIN BADGE */}
                      {isAdmin && (
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mt-2 inline-flex items-center gap-1 rounded-full
                          bg-gradient-to-r from-emerald-500 to-cyan-500
                          px-3 py-1 text-xs font-bold text-black"
                        >
                          <ShieldCheck size={14} /> ADMIN
                        </motion.div>
                      )}
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={() => router.push("/account")}>
                      <User size={16} /> Account
                    </DropdownMenuItem>

                    <DropdownMenuItem
  onSelect={() => router.push("/admin")}
  className={clsx(
    "relative overflow-hidden",
    !isAdmin && "opacity-70"
  )}
>
  {/* SHIMMER */}
  <motion.span
    animate={{ x: ["-120%", "120%"] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    className="pointer-events-none absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent"
  />

  <ShieldCheck size={16} />

  <span className="flex items-center gap-2">
    Admin Dashboard

    {!isAdmin && (
      <motion.span
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="
          rounded-full bg-gradient-to-r
          from-slate-600 to-slate-800
          px-2 py-[2px]
          text-[10px] font-bold text-white
        "
      >
        RESTRICTED
      </motion.span>
    )}
  </span>
</DropdownMenuItem>



                    <DropdownMenuItem onSelect={() => router.push("/pricing")}>
                      <CreditCard size={16} /> Billing
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={logout} className="text-red-500">
                      <LogOut size={16} /> Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* MOBILE MENU */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </motion.nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative mx-auto mt-24 max-w-sm rounded-3xl
              bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30
              p-8 shadow-[0_0_80px_rgba(236,72,153,0.5)]"
            >
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4">
                <X />
              </button>

              <div className="flex flex-col gap-6 text-lg font-bold">
                {[ 
                  ["Resume Builder", "/builder"],
                  ["Pricing", "/pricing"],
                  ...(user ? [["Account", "/account"]] : []),
                  ...(isAdmin ? [["Admin Dashboard", "/admin"]] : []),
                ].map(([label, href]) => (
                  <motion.button
                    key={href}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => {
                      router.push(href)
                      setOpen(false)
                    }}
                  >
                    {label}
                  </motion.button>
                ))}

                {user && (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="text-red-400"
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
