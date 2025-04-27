"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeSettings } from "@/components/theme-settings";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

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
    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Focus trap
      const menu = document.getElementById("mobile-menu");
      const focusableElements = menu?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements?.length) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        // Focus first element when menu opens
        firstElement.focus();

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        menu?.addEventListener("keydown", handleTabKey);
        return () => {
          menu?.removeEventListener("keydown", handleTabKey);
          document.body.style.overflow = "unset";
        };
      }
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={`py-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {currentTime}, {siteConfig.location}
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1"
          aria-label="Primary navigation"
        >
          <Button variant="ghost" asChild>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#projects" aria-label="View projects">
              Projects
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#experience" aria-label="View experience">
              Experience
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#skills" aria-label="View skills">
              Skills
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact" aria-label="Contact information">
              Contact
            </Link>
          </Button>
          <a
            href={siteConfig.cvDownloadUrl}
            download="Muhammad_Haad_CV.pdf"
            className="ml-2"
            aria-label="Download CV"
          >
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-3 w-3" aria-hidden="true" />
              CV
            </Button>
          </a>

          {/* Theme toggle */}
          <div
            className="ml-2 flex items-center"
            role="group"
            aria-label="Theme settings"
          >
            <ThemeToggle />
            <ThemeSettings />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-0 z-50 transform transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        <nav className="relative bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/" className="justify-start">
                Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#projects" className="justify-start">
                Projects
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#experience" className="justify-start">
                Experience
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#skills" className="justify-start">
                Skills
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#contact" className="justify-start">
                Contact
              </Link>
            </Button>
            <a
              href={siteConfig.cvDownloadUrl}
              download="Muhammad_Haad_CV.pdf"
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
            >
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </a>
            <div className="pt-2 flex items-center">
              <ThemeSettings />
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}
