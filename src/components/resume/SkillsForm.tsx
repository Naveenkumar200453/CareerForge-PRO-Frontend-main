"use client"

import { Input } from "@/components/ui/input"
import { useResume } from "@/context/ResumeContext"

export default function SkillsForm() {
  const { resume, setResume } = useResume()

  return (
    <section>
      <h3 className="mb-2 font-semibold">Skills (comma separated)</h3>

      <Input
        placeholder="JavaScript, React, Node.js"
        value={resume.skills.join(", ")}
        onChange={e =>
          setResume(prev => ({
            ...prev,
            skills: e.target.value.split(",").map(s => s.trim()),
          }))
        }
      />
    </section>
  )
}
