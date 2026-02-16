export function formatDate(date?: string) {
  if (!date) return ""

  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}
