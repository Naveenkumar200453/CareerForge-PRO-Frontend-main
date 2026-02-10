"use client"

import { useEffect } from "react"
import PersonalForm from "@/components/resume/PersonalForm"
import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeContext"
import { validateStep } from "@/lib/stepValidation"

export default function ContactsStep({ onNext }: { onNext: () => void }) {
  const { resume, setResume } = useResume()

  /* =======================
     Real-time validation
  ======================= */
  const isValid = validateStep(resume, "contacts")

  useEffect(() => {
    setResume(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        contacts: isValid,
      },
    }))
  }, [
    resume.personal.name,
    resume.personal.email,
    resume.personal.phone,
  ])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Add your contact information so employers can reach you.
        </p>
      </div>

      {/* Form */}
      <PersonalForm />

      {/* Footer Actions */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!isValid}
        >
          Next: Experience
        </Button>
      </div>
    </div>
  )
}
