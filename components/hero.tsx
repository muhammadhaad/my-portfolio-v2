"use client";

import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, createMailtoLink } from "@/lib/data";
import { useState } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="min-h-[100vh] flex items-center relative py-8 md:py-0">
      {/* Background pattern/overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50 z-0"></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text content */}
          <div className="space-y-6 order-2 lg:order-1 hero-content">
            <p className="text-lg text-muted-foreground">Hi! My Name is</p>
            <h1 className="text-5xl md:text-7xl font-bold">
              {siteConfig.name}
            </h1>
            <p className="text-xl max-w-2xl text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
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
            </div>
          </div>

          {/* Image container */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end hero-image">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl profile-glow">
              {/* Replace with your actual image */}
              <Image
                src={
                  imgError
                    ? "/placeholder.svg?height=400&width=400"
                    : siteConfig.profileImage
                }
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
                onError={() => setImgError(true)}
              />

              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <Link href="#experience" className="block">
          <div className="w-8 h-12 rounded-full border-2 border-primary flex items-start justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </Link>
      </div>
    </section>
  );
}
