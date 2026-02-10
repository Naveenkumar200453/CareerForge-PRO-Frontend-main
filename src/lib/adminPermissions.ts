/* =========================
   ADMIN PERMISSIONS (RBAC)
========================= */

export type AdminPermission =
  | "view_dashboard"
  | "view_users"
  | "promote_admin"
  | "demote_admin"
  | "invite_admin"
  | "view_revenue"
  | "view_audit_logs"
  | "impersonate_user"

export type AdminLevel = "super" | "normal"

/* =========================
   PERMISSION MATRIX
========================= */
const PERMISSIONS: Record<AdminLevel, AdminPermission[]> = {
  /* 🔱 SUPER ADMIN
     - Full system authority
     - Can escalate / de-escalate roles
     - Can impersonate users
     - Can view money + audit trails
  */
  super: [
    "view_dashboard",
    "view_users",
    "promote_admin",
    "demote_admin",
    "invite_admin",
    "view_revenue",
    "view_audit_logs",
    "impersonate_user",
  ],

  /* 🛡️ NORMAL ADMIN
     - Operational access only
     - NO role escalation
     - NO revenue visibility
     - NO audit logs
  */
  normal: [
    "view_dashboard",
    "view_users",
  ],
}

/* =========================
   PERMISSION CHECK HELPER
========================= */
export function can(
  admin: { role?: string; adminLevel?: AdminLevel } | null,
  permission: AdminPermission
): boolean {
  if (!admin) return false
  if (admin.role !== "admin") return false
  if (!admin.adminLevel) return false

  return PERMISSIONS[admin.adminLevel]?.includes(permission) ?? false
}
