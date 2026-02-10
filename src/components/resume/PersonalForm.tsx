"use client"

import { Input } from "@/components/ui/input"
import { useResume } from "@/context/ResumeContext"

export default function PersonalForm() {
  const { resume, setResume } = useResume()

  const update = (field: string, value: string) => {
    setResume(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  return (
    <section>
      <h3 className="mb-2 font-semibold">Personal Information</h3>

      <div className="grid grid-cols-1 gap-3">
        <Input
          placeholder="Full Name"
          value={resume.personal.name}
          onChange={e => update("name", e.target.value)}
        />
        <Input
          placeholder="Professional Title"
          value={resume.personal.title}
          onChange={e => update("title", e.target.value)}
        />
        <Input
          placeholder="Email"
          value={resume.personal.email}
          onChange={e => update("email", e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={resume.personal.phone}
          onChange={e => update("phone", e.target.value)}
        />
        <Input
          placeholder="Location"
          value={resume.personal.location}
          onChange={e => update("location", e.target.value)}
        />
      </div>
    </section>
  )
}
