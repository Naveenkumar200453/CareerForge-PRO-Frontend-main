import { Resume } from "@/context/ResumeContext"

export function validateStep(resume: Resume, step: keyof Resume["steps"]) {
  switch (step) {
    case "contacts":
      return Boolean(
        resume.personal.name &&
        resume.personal.email &&
        resume.personal.phone
      )

    case "experience":
      return resume.experience.length > 0 &&
        resume.experience.every(e => e.role && e.company)

    case "education":
      return resume.education.length > 0 &&
        resume.education.every(e => e.degree && e.institution)

    case "skills":
      return resume.skills.length > 0

    case "summary":
      return resume.summary.length > 50

    default:
      return false
  }
}
