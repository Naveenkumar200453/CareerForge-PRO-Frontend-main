"use client"

import { motion } from "framer-motion"
import { highlightDiff } from "@/utils/diff"
import { useResume } from "@/context/ResumeContext"

import ClassicTemplate from "./templates/ClassicTemplate"
import ModernTemplate from "./templates/ModernTemplate"

/* =======================
   Helpers
======================= */

function renderDiff(
  prevText: string,
  currentText: string
) {
  if (!prevText) return currentText

  return highlightDiff(prevText, currentText).map(
    (part, i) => (
      <span
        key={i}
        className={
          part.added
            ? "bg-green-200/60 text-green-900 px-0.5 rounded"
            : part.removed
            ? "bg-red-200/60 text-red-900 line-through px-0.5 rounded"
            : ""
        }
      >
        {part.value}
      </span>
    )
  )
}

function highlightATS(
  text: string,
  matched: string[],
  missing: string[]
) {
  let html = text

  matched.forEach(k => {
    html = html.replace(
      new RegExp(`\\b(${k})\\b`, "gi"),
      `<mark class="bg-green-300/60 rounded px-0.5">$1</mark>`
    )
  })

  return html
}

/* =======================
   Preview
======================= */

export default function ResumePreview() {
  const { resume, prevResume, ats } = useResume()

  const templateProps = {
    resume,
    renderDiff,
    highlightATS,
    ats,
    prevResume,
  }

  return (
    <motion.div
      key={resume.template}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="min-h-full"
    >
      {resume.template === "modern" ? (
        <ModernTemplate {...templateProps} />
      ) : (
        <ClassicTemplate {...templateProps} />
      )}
    </motion.div>
  )
}
