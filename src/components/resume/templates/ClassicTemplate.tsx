import BaseTemplate from "./BaseTemplate"
import { Resume } from "@/context/ResumeContext"
import { formatDate } from "@/lib/formatDate"

export default function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <BaseTemplate resume={resume}>

      {/* ===== SUMMARY ===== */}
      {resume.summary && (
        <section className="mb-3">
          <h2 className="border-b border-black text-sm font-bold uppercase tracking-wide">
            Summary
          </h2>
          <p className="mt-1 text-sm leading-relaxed">
            {resume.summary}
          </p>
        </section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {resume.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="border-b border-black text-sm font-bold uppercase tracking-wide">
            Experience
          </h2>

          {resume.experience.map(exp => (
            <div key={exp.id} className="mt-2">
              {/* Role + Dates */}
              <div className="flex justify-between text-sm font-semibold">
                <span>
                  {exp.role}
                  {exp.company && `, ${exp.company}`}
                </span>
                <span className="text-xs font-normal">
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </span>
              </div>

              {/* Bullet Points */}
              <ul className="mt-1 list-disc pl-5 text-sm">
                {exp.bullets
                  .filter(Boolean)
                  .map((bullet, i) => (
                    <li key={i} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ===== EDUCATION ===== */}
      {resume.education.length > 0 && (
        <section className="mb-3">
          <h2 className="border-b border-black text-sm font-bold uppercase tracking-wide">
            Education
          </h2>

          {resume.education.map(edu => (
            <div key={edu.id} className="mt-2 text-sm">
              <div className="flex justify-between font-semibold">
                <span>{edu.degree}</span>
                <span className="text-xs font-normal">
                  {formatDate(edu.startYear)} – {formatDate(edu.endYear)}

                </span>
              </div>
              <p className="italic">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* ===== SKILLS ===== */}
      {resume.skills.length > 0 && (
        <section>
          <h2 className="border-b border-black text-sm font-bold uppercase tracking-wide">
            Technical Skills
          </h2>
          <p className="mt-1 text-sm leading-relaxed">
            {resume.skills.join(", ")}
          </p>
        </section>
      )}

    </BaseTemplate>
  )
}
