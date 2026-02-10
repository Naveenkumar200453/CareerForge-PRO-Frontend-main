import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { AuthProvider } from "@/context/AuthContext"
import type { Metadata } from "next"
import Script from "next/script"

/* =======================
   SEO + OpenGraph Metadata
======================= */

export const metadata: Metadata = {
  title: "CareerForge Pro – AI Resume Builder",
  description:
    "Build ATS-optimized resumes with AI. Rewrite bullets, match job descriptions, and download recruiter-ready PDFs.",

  metadataBase: new URL("https://careerforgepro.com"),

  openGraph: {
    title: "CareerForge Pro – AI Resume Builder",
    description:
      "AI Resume Builder that beats ATS and wins interviews.",
    url: "https://careerforgepro.com",
    siteName: "CareerForge Pro",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CareerForge Pro Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CareerForge Pro – AI Resume Builder",
    description:
      "AI-powered resume builder with ATS scoring, keyword matching, and recruiter-ready PDFs.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

/* =======================
   Root Layout
======================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="pt-16">{children}

              <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="afterInteractive"
        />
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
