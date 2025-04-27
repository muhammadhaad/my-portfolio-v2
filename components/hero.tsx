"use server";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getContentData, type AboutData } from "@/lib/utils";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default async function Hero() {
  const aboutData = await getContentData<AboutData>("about");

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {aboutData.greeting}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
              {aboutData.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={aboutData.cvDownloadUrl}
                  download="Muhammad_Haad_CV.pdf"
                >
                  Download CV
                  <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="w-48 sm:w-56 md:w-full md:max-w-sm relative mx-auto">
            <div className="profile-glow">
              <Image
                src={aboutData.profileImage}
                alt={aboutData.name}
                width={400}
                height={400}
                priority
                className="rounded-full border-4 border-border shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
