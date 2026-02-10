import { Resume } from "@/context/ResumeContext"

export default function BaseTemplate({
  resume,
  children,
}: {
  resume: Resume
  children: React.ReactNode
}) {
  return (
    <article className="mx-auto max-w-[794px] px-6 py-4 font-serif text-sm leading-relaxed">

      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {resume.personal.name}
        </h1>
        <p className="text-sm">{resume.personal.title}</p>
        <p className="text-xs">
          {resume.personal.email} | {resume.personal.phone} |{" "}
          {resume.personal.location}
        </p>
      </header>

      {children}
    </article>
  )
}
