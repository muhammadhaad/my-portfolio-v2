"use client"

import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { siteConfig, createMailtoLink } from "@/lib/data"

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">Hi! My Name is</p>
        <h1 className="text-5xl md:text-7xl font-bold">{siteConfig.name}</h1>
        <p className="text-xl max-w-2xl text-muted-foreground">
         {siteConfig.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href={createMailtoLink("Contact from Portfolio Website")}>
            <Button variant="secondary" className="gap-2">
              <Mail className="h-4 w-4" />
              Email me
            </Button>
          </Link>
          <a
            href={siteConfig.cvDownloadUrl}
            download="Muhammad_Haad_CV.pdf"
            onClick={(e) => {
              // Track download event if needed
              console.log("CV download initiated")
            }}
          >
            <Button variant="default" className="gap-2">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
