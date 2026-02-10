"use client"

import { useState } from "react"
import { BuilderStep } from "@/lib/builderSteps"
import ResumeStepper from "./ResumeStepper"

import ContactsStep from "./steps/ContactsStep"
import ExperienceStep from "./steps/ExperienceStep"
import EducationStep from "./steps/EducationStep"
import SkillsStep from "./steps/SkillsStep"
import SummaryStep from "./steps/SummaryStep"
import FinalizeStep from "./steps/FinalizeStep"

export default function BuilderWizard() {
  const [step, setStep] = useState<BuilderStep>("contacts")

  return (
    <div className="flex h-full flex-col">
      <ResumeStepper currentStep={step} onStepChange={setStep} />

      <div className="flex-1 overflow-y-auto p-6">
        {step === "contacts" && <ContactsStep onNext={() => setStep("experience")} />}

        {step === "experience" && (
          <ExperienceStep
            onBack={() => setStep("contacts")}
            onNext={() => setStep("education")}
          />
        )}

        {step === "education" && (
          <EducationStep
            onBack={() => setStep("experience")}
            onNext={() => setStep("skills")}
          />
        )}

        {step === "skills" && (
          <SkillsStep
            onBack={() => setStep("education")}
            onNext={() => setStep("summary")}
          />
        )}

        {step === "summary" && (
          <SummaryStep
            onBack={() => setStep("skills")}
            onNext={() => setStep("finalize")}
          />
        )}

        {step === "finalize" && <FinalizeStep onBack={() => setStep("summary")} />}
      </div>
    </div>
  )
}
