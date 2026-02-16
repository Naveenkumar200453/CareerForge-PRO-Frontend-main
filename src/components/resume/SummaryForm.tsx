"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useResume } from "@/context/ResumeContext"
import { validateStep } from "@/lib/stepValidation"

export default function SummaryForm() {
  const { resume, setResume } = useResume()
  const [loading, setLoading] = useState(false)

  /* =======================
     Validation
  ======================= */
  const isValid = validateStep(resume, "summary")

  useEffect(() => {
    setResume(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        summary: isValid,
      },
    }))
  }, [resume.summary])

  /* =======================
     AI Generator (UI-ready)
  ======================= */
  const generateWithAI = async () => {
    try {
      setLoading(true)

      // Week 2: replace with real API
      // const res = await fetch("/api/ai/summary", { ... })

      const mockSummary =
        "Results-driven software engineer with hands-on experience in building scalable web applications, strong problem-solving skills, and a passion for delivering high-quality solutions."

      setResume(prev => ({
        ...prev,
        summary: mockSummary,
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Professional Summary</h3>

        <Button
          size="sm"
          variant="secondary"
          onClick={generateWithAI}
          disabled={loading}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Generate with AI"}
        </Button>
      </div>

      {/* Textarea */}
      <Textarea
        rows={5}
        placeholder="Brief professional summary (50+ characters recommended)..."
        value={resume.summary}
        onChange={e =>
          setResume(prev => ({
            ...prev,
            summary: e.target.value,
          }))
        }
      />

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        Tip: A strong summary improves ATS score and recruiter engagement.
      </p>
    </section>
  )
}
