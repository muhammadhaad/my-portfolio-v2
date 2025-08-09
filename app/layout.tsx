import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { basicInfo } from "@/lib/generated-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${basicInfo.name} - ${basicInfo.title}`,
  description: basicInfo.description,
  keywords: ["Software Developer", "Full Stack Developer", "Next.js", "Flutter", "NestJS", "Portfolio"],
  authors: [{ name: basicInfo.name, url: "https://github.com/muhammadhaad" }],
  creator: basicInfo.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadhaad.vercel.app",
    title: `${basicInfo.name} - ${basicInfo.title}`,
    description: basicInfo.description,
    siteName: `${basicInfo.name} Portfolio`,
    images: [
      {
        url: "/images/profile.png",
        width: 400,
        height: 400,
        alt: basicInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${basicInfo.name} - ${basicInfo.title}`,
    description: basicInfo.description,
    creator: "@muhammadhaad",
    images: ["/images/profile.png"],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
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
