"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeContext"
import { validateStep } from "@/lib/stepValidation"
import EducationForm from "@/components/resume/EducationForm"

/* dnd-kit */
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"

export default function EducationStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const { resume, setResume } = useResume()

  /* =======================
     Validation
  ======================= */
  const isValid = validateStep(resume, "education")

  useEffect(() => {
    setResume(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        education: isValid,
      },
    }))
  }, [resume.education])

  /* =======================
     Drag & Reorder
  ======================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setResume(prev => {
      const oldIndex = prev.education.findIndex(
        edu => edu.id === active.id
      )
      const newIndex = prev.education.findIndex(
        edu => edu.id === over.id
      )

      return {
        ...prev,
        education: arrayMove(prev.education, oldIndex, newIndex),
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Education</h1>
        <p className="text-sm text-muted-foreground">
          Add your education details — even if you haven’t graduated yet.
          You can drag items to reorder them.
        </p>
      </div>

      {/* Education Form with Drag Context */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={resume.education.map(e => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <EducationForm />
        </SortableContext>
      </DndContext>

      {/* Footer Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onNext} disabled={!isValid}>
          Next: Skills
        </Button>
      </div>
    </div>
  )
}
