"use client";

import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { basicInfo, createMailtoLink } from "@/lib/generated-data";
import { useState, useEffect } from "react";

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  // Generate floating particles on mount
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 6,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <section className="min-h-[100vh] flex items-center relative section-padding-sm overflow-hidden">
      {/* Muted animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/5 animate-gradient z-0"></div>
      
      {/* Subtle muted gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/8 to-secondary/6 rounded-full blur-3xl animate-float z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/8 to-primary/6 rounded-full blur-3xl animate-pulse-glow z-0" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-secondary/5 to-accent/7 rounded-full blur-2xl animate-float z-0" style={{animationDelay: '2s'}}></div>
      
      {/* Subtle floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/12 animate-particle-float z-0"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}
      
      {/* Enhanced dot pattern with gradient */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          animation: "gradient-shift 8s ease-in-out infinite",
        }}
      ></div>

      <div className="section-container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="space-y-8 order-2 lg:order-1 hero-content">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 animate-fade-in-up backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></span>
                Available for opportunities
              </div>
              <div className="space-y-3">
                <p className="text-lg text-muted-foreground font-medium animate-slide-in-left" style={{animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards'}}>Hi! I'm</p>
                <h1 className="heading-xl bg-gradient-to-r from-foreground via-primary to-foreground/80 bg-clip-text text-transparent leading-tight animate-fade-in-up" style={{animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards'}}>
                  {basicInfo.name}
                </h1>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl text-muted-foreground leading-relaxed animate-slide-in-left" style={{animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards'}}>
                {basicInfo.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up" style={{animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards'}}>
              <Link
                href={basicInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border-primary/20 backdrop-blur-sm">
                  <Github className="h-5 w-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  GitHub
                  <span className="sr-only">GitHub Profile</span>
                </Button>
              </Link>
              <Link
                href={basicInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border-primary/15 backdrop-blur-sm">
                  <Linkedin className="h-5 w-5 mr-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  LinkedIn
                  <span className="sr-only">LinkedIn Profile</span>
                </Button>
              </Link>
              <Link href={createMailtoLink("Contact from Portfolio Website")}>
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-glow">
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Image container */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end hero-image">
            <div className="relative group animate-fade-in-up" style={{animationDelay: '1s', opacity: 0, animationFillMode: 'forwards'}}>
              {/* Subtle animated background rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/12 via-secondary/10 to-accent/12 animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-l from-accent/10 via-primary/8 to-secondary/12 animate-spin-slow-reverse"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-primary/6 to-secondary/8 animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
              
              {/* Gentle floating glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-xl animate-float opacity-40"></div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background/80 backdrop-blur-sm shadow-2xl hover:shadow-primary/20 m-4 group-hover:scale-105 transition-all duration-500">
                <Image
                  src={
                    imgError
                      ? "/placeholder.svg?height=400&width=400"
                      : basicInfo.profileImage
                  }
                  alt={basicInfo.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                  onError={() => setImgError(true)}
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-secondary/6 group-hover:from-primary/12 group-hover:to-secondary/8 transition-all duration-500"></div>
                
                {/* Gentle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/3 to-transparent animate-gradient"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block animate-fade-in-up" style={{animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards'}}>
        <Link href="#experience" className="block group">
          <div className="w-8 h-12 rounded-full border-2 border-primary/60 bg-background/20 backdrop-blur-sm flex items-start justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-glow group-hover:bg-primary-hover transition-colors duration-300"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll down</p>
        </Link>
      </div>
    </section>
  );
}
