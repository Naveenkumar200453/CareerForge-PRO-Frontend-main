"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { v4 as uuid } from "uuid"

/* =======================
   Types
======================= */

export type Experience = {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  bullets: string[]
}

export type Education = {
  id: string
  institution: string
  degree: string
  startYear: string
  endYear: string
}

export type StepStatus = {
  contacts: boolean
  experience: boolean
  education: boolean
  skills: boolean
  summary: boolean
}

export type ATSState = {
  matched: string[]
  missing: string[]
}

export type Resume = {
  template: "classic" | "modern"

  steps: StepStatus

  personal: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
  }

  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
}

/* =======================
   Default Resume
======================= */

const defaultResume: Resume = {
  template: "classic",

  steps: {
    contacts: false,
    experience: false,
    education: false,
    skills: false,
    summary: false,
  },

  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
  },

  summary: "",

  experience: [
    {
      id: uuid(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    },
  ],

  education: [],
  skills: [],
}

/* =======================
   Context
======================= */

type ResumeContextType = {
  resume: Resume
  prevResume: Resume
  ats: ATSState
  setATS: React.Dispatch<React.SetStateAction<ATSState>>
  setResume: React.Dispatch<React.SetStateAction<Resume>>
}

const ResumeContext = createContext<ResumeContextType | null>(null)

/* =======================
   Provider
======================= */

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume)

  /* 🔥 Previous resume snapshot (for diff highlights) */
  const prevResumeRef = useRef<Resume>(defaultResume)

  /* 🔥 ATS keyword state */
  const [ats, setATS] = useState<ATSState>({
    matched: [],
    missing: [],
  })

  /* 🔹 Load saved draft */
  useEffect(() => {
    const saved = localStorage.getItem("careerforge-resume")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setResume({ ...defaultResume, ...parsed })
        prevResumeRef.current = { ...defaultResume, ...parsed }
      } catch {
        setResume(defaultResume)
      }
    }
  }, [])

  /* 🔹 Track previous resume for diff */
  useEffect(() => {
    prevResumeRef.current = resume
  }, [resume])

  /* 🔹 Auto-save on every change */
  useEffect(() => {
    localStorage.setItem(
      "careerforge-resume",
      JSON.stringify(resume)
    )
  }, [resume])

  return (
    <ResumeContext.Provider
      value={{
        resume,
        prevResume: prevResumeRef.current,
        ats,
        setATS,
        setResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

/* =======================
   Hook
======================= */

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error(
      "useResume must be used within ResumeProvider"
    )
  }
  return context
}
