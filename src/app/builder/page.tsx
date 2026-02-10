"use client"

import { ResumeProvider, useResume } from "@/context/ResumeContext"
import BuilderWizard from "@/components/builder/BuilderWizard"
import ResumePreview from "@/components/resume/ResumePreview"
import ResumeScore from "@/components/builder/ResumeScore"
import DownloadPDFButton from "@/components/resume/DownloadPDFButton"
import UpgradeModal from "@/components/billing/UpgradeModal"
import ResumeStepper from "@/components/builder/ResumeStepper"
import { useUpgradeGuard } from "@/hooks/useUpgradeGuard"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { Sparkles, Eye, X } from "lucide-react"
import { useState } from "react"

/* =======================
   COSMIC BACKGROUND
======================= */
function CosmicBackground() {
  return (
    <>
      {["bg-indigo-500/30", "bg-purple-500/30", "bg-pink-500/30"].map(
        (color, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, i % 2 === 0 ? 140 : -140, 0],
              y: [0, i % 2 === 0 ? -140 : 140, 0],
            }}
            transition={{
              duration: 34 + i * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`pointer-events-none absolute
            ${color}
            -top-56 -left-56
            h-[560px] w-[560px]
            rounded-full blur-[200px]`}
          />
        )
      )}
    </>
  )
}

/* =======================
   BUILDER CONTENT
======================= */
function BuilderContent() {
  const { resume, setResume } = useResume()
  const [mobilePreview, setMobilePreview] = useState(false)
  const { showUpgrade, closeUpgrade } = useUpgradeGuard()

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] overflow-hidden
    bg-gradient-to-br from-background via-muted/40 to-background">

      <CosmicBackground />

      {/* ================= EDITOR ================= */}
      <motion.section
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full flex-col
        md:w-[55%]
        bg-background/70 backdrop-blur-2xl
        border-r border-border"
      >
        {/* TOP BAR */}
        <div className="sticky top-0 z-30 flex flex-wrap items-center gap-2
        border-b bg-background/80 px-4 sm:px-6 py-4 backdrop-blur-xl">

          <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
            Template
          </span>

          {(["classic", "modern"] as const).map(tpl => (
            <motion.div key={tpl} whileHover={{ scale: 1.08 }}>
              <Button
                size="sm"
                variant={resume.template === tpl ? "default" : "outline"}
                className={clsx(
                  resume.template === tpl &&
                    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl"
                )}
                onClick={() =>
                  setResume(prev => ({ ...prev, template: tpl }))
                }
              >
                {tpl}
              </Button>
            </motion.div>
          ))}

          <motion.div
            className="ml-auto hidden sm:block"
            whileHover={{ scale: 1.08 }}
          >
            <Button size="sm" variant="outline" className="gap-2">
              <Sparkles size={16} />
              Improve with AI
            </Button>
          </motion.div>

          {/* MOBILE PREVIEW BUTTON */}
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto sm:hidden"
            onClick={() => setMobilePreview(true)}
          >
            <Eye />
          </Button>
        </div>

        {/* ================= MOBILE: STEPPER + FORM ================= */}
        <div className="flex flex-1 overflow-hidden md:block">
          {/* MOBILE STEPPER */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden sm:flex md:hidden
            w-16 shrink-0 flex-col items-center
            border-r bg-background/60 backdrop-blur-xl"
          >
            {/* Animated spine */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-y-0 w-px
              bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
            />

            <ResumeStepper orientation="vertical" />
          </motion.aside>

          {/* FORM */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4">
            <BuilderWizard />
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t bg-background/80 px-4 sm:px-6 py-3
        text-xs text-muted-foreground">
          Auto-saved • Real-time preview
        </div>
      </motion.section>

      {/* ================= DESKTOP PREVIEW ================= */}
      <motion.section
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 hidden md:flex w-[45%]
        flex-col bg-gradient-to-br from-muted/60 to-muted p-6"
      >
        <ResumeScore />

        <div className="my-3 flex justify-end">
          <DownloadPDFButton />
        </div>

        <motion.div
          whileHover={{ scale: 1.015 }}
          className="relative flex-1 overflow-y-auto rounded-3xl
          bg-white p-6 text-black
          shadow-[0_0_50px_rgba(0,0,0,0.4)]
          ring-1 ring-black/10"
        >
          <ResumePreview />
        </motion.div>
      </motion.section>

      {/* ================= MOBILE PREVIEW ================= */}
      <AnimatePresence>
        {mobilePreview && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col bg-white text-black">
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-semibold">Live Preview</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setMobilePreview(false)}
                >
                  <X />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <ResumePreview />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPGRADE MODAL */}
      <UpgradeModal open={showUpgrade} onClose={closeUpgrade} />
    </div>
  )
}

/* =======================
   PAGE WRAPPER
======================= */
export default function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  )
}
