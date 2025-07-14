"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeSettings } from "@/components/theme-settings";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-3 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo/Name */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-lg">
              {siteConfig.name.split(" ")[0]}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="#experience">Experience</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#projects">Projects</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#skills">Skills</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#contact">Contact</Link>
            </Button>
          </div>

          {/* Right side items (always visible) */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {currentTime}
            </div>

            <a
              href={siteConfig.cvDownloadUrl}
              download="Muhammad_Haad_CV.pdf"
              className="hidden sm:block"
            >
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3 w-3" />
                CV
              </Button>
            </a>

            {/* Theme toggle */}
            <ThemeToggle />
            <div className="hidden sm:block">
              <ThemeSettings />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute z-50 w-full bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#experience">Experience</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#projects">Projects</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#skills">Skills</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#contact">Contact</Link>
            </Button>
            <a
              href={siteConfig.cvDownloadUrl}
              download="Muhammad_Haad_CV.pdf"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </a>
            <div className="pt-2">
              <ThemeSettings />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
