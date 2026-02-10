"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useResume } from "@/context/ResumeContext"
import { v4 as uuid } from "uuid"

/* dnd-kit */
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

/* =======================
   Sortable Item Wrapper
======================= */

function SortableExperienceItem({
  exp,
}: {
  exp: ReturnType<typeof useResume>["resume"]["experience"][number]
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exp.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const { resume, setResume } = useResume()

  const updateField = (field: keyof typeof exp, value: any) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(e =>
        e.id === exp.id ? { ...e, [field]: value } : e
      ),
    }))
  }

  const updateBullet = (index: number, value: string) => {
    const updated = [...exp.bullets]
    updated[index] = value
    updateField("bullets", updated)
  }

  const addBullet = () => {
    updateField("bullets", [...exp.bullets, ""])
  }

  const removeBullet = (index: number) => {
    updateField(
      "bullets",
      exp.bullets.filter((_, i) => i !== index)
    )
  }

  const removeExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== exp.id),
    }))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="space-y-3 rounded border p-3"
    >
      {/* Drag Handle */}
      <div
        className="flex cursor-grab items-center gap-2 text-muted-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
        <span className="text-xs">Drag to reorder</span>
      </div>

      <Input
        placeholder="Role / Position"
        value={exp.role}
        onChange={e => updateField("role", e.target.value)}
      />

      <Input
        placeholder="Company"
        value={exp.company}
        onChange={e => updateField("company", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          type="date"
          value={exp.startDate}
          onChange={e => updateField("startDate", e.target.value)}
        />
        <Input
          type="date"
          value={exp.endDate}
          onChange={e => updateField("endDate", e.target.value)}
        />
      </div>

      {/* Bullets */}
      <div className="space-y-2">
        {exp.bullets.map((bullet, i) => (
          <div key={i} className="flex gap-2">
            <Textarea
              rows={2}
              placeholder="Achievement / Responsibility"
              value={bullet}
              onChange={e => updateBullet(i, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeBullet(i)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={addBullet}>
          + Add Bullet
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={removeExperience}
        >
          Remove Experience
        </Button>
      </div>
    </div>
  )
}

/* =======================
   Main Form
======================= */

export default function ExperienceForm() {
  const { resume, setResume } = useResume()

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uuid(),
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          bullets: [""],
        },
      ],
    }))
  }

  return (
    <div className="space-y-4">
      {resume.experience.map(exp => (
        <SortableExperienceItem key={exp.id} exp={exp} />
      ))}

      <Button variant="outline" onClick={addExperience}>
        + Add Experience
      </Button>
    </div>
  )
}
