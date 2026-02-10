export const BUILDER_STEPS = [
  { id: "contacts", label: "Contacts" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "summary", label: "Summary" },
  { id: "finalize", label: "Finalize" },
] as const

export type BuilderStep = typeof BUILDER_STEPS[number]["id"]
