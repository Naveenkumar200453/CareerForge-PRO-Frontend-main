"use client"

import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  Sparkles,
  FileText,
  Zap,
  ShieldCheck,
  Stars,
  ArrowRight,
  Check,
  Brain,
  Briefcase,
  BarChart,
  Users,
  Cpu,
  FileSearch,
  Layers,
  Gauge,
  Target,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

/* =======================
   DATA
======================= */

const testimonials = [
  {
    name: "Amit Verma",
    role: "Software Engineer",
    quote:
      "CareerForge Pro doubled my interview calls. The ATS score feature is unreal.",
  },
  {
    name: "Sneha Kapoor",
    role: "Product Designer",
    quote:
      "The AI rewrites feel like a senior recruiter wrote them.",
  },
  {
    name: "Rahul Mehta",
    role: "Final Year Student",
    quote:
      "From zero callbacks to multiple interviews in weeks.",
  },
]

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Analyst",
  "UI/UX Designer",
  "Marketing Specialist",
  "Business Analyst",
  "DevOps Engineer",
  "QA Engineer",
  "HR Specialist",
  "Finance Analyst",
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  /* =======================
     SCROLL TIMELINES
  ======================= */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-40%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <main ref={containerRef} className="relative overflow-hidden">

      {/* =======================
         HEAVY BACKGROUND STACK
      ======================= */}
      <motion.div
        style={{ rotate: glowRotate }}
        className="pointer-events-none absolute -top-60 left-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50 blur-[220px]"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* =======================
         HERO (PINNED)
      ======================= */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mb-6 flex items-center gap-2 rounded-full border bg-background/70 px-6 py-2 backdrop-blur-xl shadow-lg"
        >
          <Stars className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium tracking-wide">
            AI Resume • ATS Intelligence • Job Matching
          </span>
        </motion.div>

        <h1 className="max-w-6xl text-4xl font-extrabold md:text-7xl">
          Build a Resume that
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dominates ATS & Recruiters
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-muted-foreground md:text-lg">
          End-to-end AI resume platform: job description analysis, keyword scoring,
          bullet rewriting, template design, and recruiter-grade PDFs.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <Link href="/builder">
            <Button
              size="lg"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-14 text-white shadow-2xl"
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                animate={{ x: ["-120%", "120%"] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <FileText size={18} />
              Build My Resume
              <ArrowRight size={16} />
            </Button>
          </Link>

          <Button size="lg" variant="outline" className="rounded-full px-14">
            View Live Demo
          </Button>
        </div>
      </motion.section>

      {/* =======================
         TRUST + METRICS
      ======================= */}
      <section className="py-32 px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { icon: <Users />, label: "50,000+ Active Users" },
            { icon: <Gauge />, label: "92% ATS Pass Rate" },
            { icon: <Target />, label: "3× Interview Calls" },
            { icon: <Lock />, label: "Enterprise-Grade Security" },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.06 }}
              className="rounded-2xl border bg-background/80 p-8 backdrop-blur-xl shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
                {s.icon}
              </div>
              <p className="font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =======================
         PLATFORM CAPABILITIES
      ======================= */}
      <section className="bg-muted py-40 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            A Full Resume Intelligence Platform
          </h2>

          <div className="mt-24 grid gap-10 md:grid-cols-3">
            {[
              { icon: <Brain />, title: "AI Resume Intelligence", desc: "Understands context, not just keywords." },
              { icon: <Layers />, title: "Multi-Template Engine", desc: "Classic, Modern, ATS-first designs." },
              { icon: <BarChart />, title: "ATS Score Breakdown", desc: "Section-wise scoring & missing keywords." },
              { icon: <Cpu />, title: "Real-time Rewriting", desc: "Bullets rewritten per job description." },
              { icon: <Briefcase />, title: "Job Match Engine", desc: "Match resume to role & industry." },
              { icon: <ShieldCheck />, title: "Export-Ready PDFs", desc: "Pixel-perfect, recruiter-safe output." },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -14, scale: 1.06 }}
                className="rounded-3xl border bg-background p-10 shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
         ROLES
      ======================= */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Optimized for Every Career Path
          </h2>

          <div className="mt-16 flex flex-wrap justify-center gap-5">
            {roles.map(role => (
              <motion.span
                key={role}
                whileHover={{ scale: 1.15 }}
                className="rounded-full border bg-background/80 px-6 py-3 text-sm backdrop-blur-xl shadow"
              >
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
         TESTIMONIAL WALL
      ======================= */}
      <section className="bg-muted py-40 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Trusted by Job Seekers Worldwide
          </h2>

          <motion.div
            className="mt-20 flex gap-10"
            animate={{ x: ["0%", "-60%"] }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[360px] rounded-3xl border bg-background p-10 shadow-2xl"
              >
                <p className="italic text-lg">“{t.quote}”</p>
                <p className="mt-6 font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =======================
         FINAL CTA
      ======================= */}
      <section className="py-44 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-20 text-white shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
        >
          <h2 className="text-4xl font-extrabold">
            This Is Where Careers Are Forged
          </h2>

          <p className="mt-6 text-lg text-white/90">
            Start free. Upgrade when you’re ready. Land better interviews.
          </p>

          <Link href="/builder">
            <Button
              size="lg"
              className="mt-12 rounded-full bg-white px-16 text-black"
            >
              Start Building for Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
