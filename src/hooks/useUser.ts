"use client"

export function useUser() {
  // TEMP MOCK — replace with real auth later
  return {
    user: {
      id: "guest",
      email: "guest@careerforge.pro",
      plan: "free", // "free" | "pro" | "ultimate"
    },
  }
}
