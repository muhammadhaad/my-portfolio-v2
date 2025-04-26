"use client"

import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

// Replace with your actual CV file URL
const CV_URL = "https://drive.google.com/uc?export=download&id=your-file-id"

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">Hi! My Name is</p>
        <h1 className="text-5xl md:text-7xl font-bold">Muhammad Haad Bin Zahid</h1>
        <p className="text-xl max-w-2xl text-muted-foreground">
          Versatile Full Stack Developer with 4+ years of web and mobile development expertise. Proficient in Next.js,
          NestJS, and Flutter with a proven record of delivering secure, high-performance applications. Seeking
          challenging remote opportunities to leverage my technical skills and experience in creating innovative
          software solutions.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="https://github.com/muhammadhaad" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/muhammadhaad" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:muhammadhaad618@gmail.com">
            <Button variant="secondary" className="gap-2">
              <Mail className="h-4 w-4" />
              Email me
            </Button>
          </Link>
          <a
            href={CV_URL}
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
