"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Mail, Settings } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-extrabold tracking-tight">
        🛡 Admin Settings
      </h1>

      {/* Admin Roles */}
      <div className="rounded-3xl bg-background/70 backdrop-blur-xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-indigo-500" />
          <h2 className="text-lg font-bold">Admin Roles</h2>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Super Admin → Full control (invite, promote, demote)</li>
          <li>• Admin → Dashboard + users + revenue</li>
          <li>• Users → No admin access</li>
        </ul>
      </div>

      {/* Invite Admin */}
      <div className="rounded-3xl bg-background/70 backdrop-blur-xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="text-pink-500" />
          <h2 className="text-lg font-bold">Invite Admin</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          Admin invites are handled via secure email tokens.
          Only super admins can send invites.
        </p>
      </div>

      {/* System */}
      <div className="rounded-3xl bg-background/70 backdrop-blur-xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="text-purple-500" />
          <h2 className="text-lg font-bold">System</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          Audit logs, impersonation, and security settings will live here.
        </p>
      </div>
    </motion.div>
  )
}
