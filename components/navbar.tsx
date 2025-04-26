"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Replace with your actual CV file URL
const CV_URL = "https://drive.google.com/uc?export=download&id=your-file-id"

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
      setCurrentTime(now.toLocaleTimeString("en-US", options))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="py-4 border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-5xl flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{currentTime}, Rawalpindi, Pakistan</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#projects">Projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#experience">Experience</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#skills">Skills</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
          <a href={CV_URL} download="Muhammad_Haad_CV.pdf" className="ml-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-3 w-3" />
              CV
            </Button>
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute z-50 w-full bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="#projects">Projects</Link>
            </Button>
            <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="#experience">Experience</Link>
            </Button>
            <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="#skills">Skills</Link>
            </Button>
            <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
              <Link href="#contact">Contact</Link>
            </Button>
            <a href={CV_URL} download="Muhammad_Haad_CV.pdf" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
