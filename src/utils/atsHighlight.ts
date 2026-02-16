export function highlightATS(
  text: string,
  matched: string[],
  missing: string[]
) {
  let result = text

  matched.forEach(k => {
    result = result.replace(
      new RegExp(`\\b${k}\\b`, "gi"),
      `<mark class="bg-green-300 rounded px-1">${k}</mark>`
    )
  })

  return result
}
