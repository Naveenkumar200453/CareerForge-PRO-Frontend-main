export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase
      ${
        role === "admin"
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {role}
    </span>
  )
}

export function PlanBadge({ plan }: { plan: string }) {
  const styles: any = {
    free: "bg-slate-600 text-white",
    pro: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    ultimate: "bg-gradient-to-r from-pink-500 to-orange-400 text-white",
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[plan]}`}>
      {plan}
    </span>
  )
}
