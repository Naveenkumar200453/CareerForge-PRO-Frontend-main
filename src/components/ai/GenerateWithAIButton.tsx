import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GenerateWithAIButton({
  onClick,
  loading,
}: {
  onClick: () => void
  loading?: boolean
}) {
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={onClick}
      disabled={loading}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      {loading ? "Generating..." : "Generate with AI"}
    </Button>
  )
}
