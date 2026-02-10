import SummaryForm from "@/components/resume/SummaryForm"
import { Button } from "@/components/ui/button"

export default function SummaryStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Summary</h1>
      <p className="text-sm text-muted-foreground">
        Write a short introduction highlighting your experience and goals.
      </p>

      <SummaryForm />

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next: Finalize</Button>
      </div>
    </div>
  )
}
