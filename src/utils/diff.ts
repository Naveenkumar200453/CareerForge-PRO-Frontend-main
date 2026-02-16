import { diffWords } from "diff"

export function highlightDiff(oldText = "", newText = "") {
  return diffWords(oldText, newText)
}
