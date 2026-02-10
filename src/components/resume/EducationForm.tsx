"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResume } from "@/context/ResumeContext"
import { v4 as uuid } from "uuid"

export default function EducationForm() {
  const { resume, setResume } = useResume()

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuid(),
          institution: "",
          degree: "",
          startYear: "",
          endYear: "",
        },
      ],
    }))
  }

  const updateEducation = (
    id: string,
    field: keyof (typeof resume.education)[number],
    value: string
  ) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }))
  }

  return (
    <section>
      <h3 className="mb-2 font-semibold">Education</h3>

      {resume.education.map(edu => (
        <div
          key={edu.id}
          className="mb-4 space-y-2 rounded border p-3"
        >
          <Input
            placeholder="Institution / University"
            value={edu.institution}
            onChange={e =>
              updateEducation(edu.id, "institution", e.target.value)
            }
          />

          <Input
            placeholder="Degree (e.g. B.Tech in CSE)"
            value={edu.degree}
            onChange={e =>
              updateEducation(edu.id, "degree", e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
  type="date"
  value={edu.startYear}
  onChange={e => updateEducation(edu.id, "startYear", e.target.value)}
/>

<Input
  type="date"
  value={edu.endYear}
  onChange={e => updateEducation(edu.id, "endYear", e.target.value)}
/>

          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeEducation(edu.id)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button variant="outline" onClick={addEducation}>
        + Add Education
      </Button>
    </section>
  )
}
