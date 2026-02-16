import PersonalForm from "./PersonalForm"
import SummaryForm from "./SummaryForm"
import ExperienceForm from "./ExperienceForm"
import SkillsForm from "./SkillsForm"
import EducationForm from "./EducationForm"



export default function ResumeForm() {
  return (
    <div className="space-y-6">
      <PersonalForm />
      <SummaryForm />
      <EducationForm />
      <ExperienceForm />
      <SkillsForm />
    </div>
  )
}

