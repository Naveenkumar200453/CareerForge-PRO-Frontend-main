"use client"

import { useEffect } from "react"
import ExperienceForm from "@/components/resume/ExperienceForm"
import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeContext"
import { validateStep } from "@/lib/stepValidation"

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

export default function ExperienceStep({
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
  const isValid = validateStep(resume, "experience")

  useEffect(() => {
    setResume(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        experience: isValid,
      },
    }))
  }, [resume.experience])

  /* =======================
     Drag & Reorder
  ======================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setResume(prev => {
      const oldIndex = prev.experience.findIndex(
        exp => exp.id === active.id
      )
      const newIndex = prev.experience.findIndex(
        exp => exp.id === over.id
      )

      return {
        ...prev,
        experience: arrayMove(prev.experience, oldIndex, newIndex),
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Experience</h1>
        <p className="text-sm text-muted-foreground">
          List your work experience starting with the most recent.
          You can drag entries to reorder them.
        </p>
      </div>

      {/* Experience Form with Drag Context */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={resume.experience.map(e => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <ExperienceForm />
        </SortableContext>
      </DndContext>

      {/* Footer Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onNext} disabled={!isValid}>
          Next: Education
        </Button>
      </div>
    </div>
  )
}
