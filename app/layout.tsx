import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.title}`,
  description: siteConfig.description,
  keywords: ["Software Developer", "Full Stack Developer", "Next.js", "Flutter", "NestJS", "Portfolio"],
  authors: [{ name: siteConfig.name, url: "https://github.com/muhammadhaad" }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadhaad.vercel.app",
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    creator: "@muhammadhaad",
  },
  generator: "Next.js",
  applicationName: "Muhammad Haad Portfolio",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://muhammadhaad.vercel.app"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "light-high-contrast", "dark-high-contrast"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
