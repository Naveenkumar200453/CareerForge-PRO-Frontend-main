export default function ResumeScore() {
  // Week 2: replace with real ATS logic
  const score = 40

  return (
    <div className="mb-3 flex items-center gap-2 text-sm">
      <span className="rounded bg-orange-100 px-2 py-1 font-medium text-orange-600">
        {score}%
      </span>
      <span className="text-muted-foreground">
        Your resume score 😊
      </span>
    </div>
  )
}
