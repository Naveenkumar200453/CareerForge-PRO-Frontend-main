"use client"

import { BUILDER_STEPS, BuilderStep } from "@/lib/builderSteps"
import { useResume } from "@/context/ResumeContext"
import clsx from "clsx"
import { Check } from "lucide-react"

/* =======================
   Resume Stepper
======================= */

export default function ResumeStepper({
  currentStep,
  onStepChange,
  orientation = "horizontal",
}: {
  currentStep?: any
  onStepChange?: any
  orientation?: "vertical" | "horizontal"
}) {
  const { resume } = useResume()

  const stepIndex = BUILDER_STEPS.findIndex(s => s.id === currentStep)

  return (
    <div className="flex items-center gap-3 border-b px-6 py-4">
      {BUILDER_STEPS.map((step, index) => {
        const isActive = step.id === currentStep
        const isComplete = resume.steps[step.id]
        const isLocked = index > stepIndex + 1

        return (
          <div
            key={step.id}
            className={clsx(
              "flex flex-1 items-center gap-2",
              !isLocked && "cursor-pointer",
              isLocked && "cursor-not-allowed opacity-40"
            )}
            onClick={() => {
              if (!isLocked) onStepChange(step.id)
            }}
          >
            {/* Step Indicator */}
            <div
              className={clsx(
                "flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                isComplete
                  ? "border-green-500 bg-green-500 text-white"
                  : isActive
                    ? "border-primary bg-primary text-white"
                    : "border-muted-foreground text-muted-foreground"
              )}
            >
              {isComplete ? <Check size={12} /> : null}
            </div>

            {/* Step Label */}
            <span
              className={clsx(
                "text-sm whitespace-nowrap",
                isActive
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>

            {/* Connector */}
            {index !== BUILDER_STEPS.length - 1 && (
              <div className="h-px flex-1 bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )
}
