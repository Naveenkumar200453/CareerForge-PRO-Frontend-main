import { formatDate } from "@/lib/formatDate"
import BaseTemplate from "./BaseTemplate"
import { Resume } from "@/context/ResumeContext"

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <BaseTemplate resume={resume}>

      {/* ===== SUMMARY / PROFILE ===== */}
      {resume.summary && (
        <section className="mb-4">
          <h2 className="border-b border-gray-400 text-xs font-semibold uppercase tracking-widest text-gray-700">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-relaxed">
            {resume.summary}
          </p>
        </section>
      )}

      {/* ===== EDUCATION ===== */}
      {resume.education.length > 0 && (
        <section className="mb-4">
          <h2 className="border-b border-gray-400 text-xs font-semibold uppercase tracking-widest text-gray-700">
            Education
          </h2>

          {resume.education.map(edu => (
            <div key={edu.id} className="mt-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{edu.degree}</span>
                <span className="text-xs font-normal">
                  {formatDate(edu.startYear)} – {formatDate(edu.endYear)}

                </span>
              </div>
              <p className="italic text-sm">{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {resume.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="border-b border-gray-400 text-xs font-semibold uppercase tracking-widest text-gray-700">
            Experience
          </h2>

          {resume.experience.map(exp => (
            <div key={exp.id} className="mt-3">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  {exp.role}
                  {exp.company && `, ${exp.company}`}
                </span>
                <span className="text-xs font-normal">
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </span>
              </div>

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

      {/* ===== SKILLS ===== */}
      {resume.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="border-b border-gray-400 text-xs font-semibold uppercase tracking-widest text-gray-700">
            Skills
          </h2>
          <p className="mt-1 text-sm leading-relaxed">
            {resume.skills.join(" • ")}
          </p>
        </section>
      )}

    </BaseTemplate>
  )
}
