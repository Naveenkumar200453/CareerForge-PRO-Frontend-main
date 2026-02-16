import { Button } from "@/components/ui/button"

export default function FinalizeStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Finalize</h1>
      <p className="text-sm text-muted-foreground">
        Review your resume and prepare it for download.
      </p>

      <div className="rounded border p-4 text-sm">
        ✔ All sections completed  
        ✔ ATS-safe formatting  
        ✔ Ready for PDF export
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button>Download Resume</Button>
      </div>
    </div>
  )
}
