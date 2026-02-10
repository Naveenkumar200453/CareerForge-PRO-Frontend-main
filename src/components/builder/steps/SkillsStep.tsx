import SkillsForm from "@/components/resume/SkillsForm"
import { Button } from "@/components/ui/button"

export default function SkillsStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Skills</h1>
      <p className="text-sm text-muted-foreground">
        Add your most relevant professional skills.
      </p>

      <SkillsForm />

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next: Summary</Button>
      </div>
    </div>
  )
}
