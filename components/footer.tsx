"use server";

import Link from "next/link";
import { getContentData, type AboutData } from "@/lib/utils";

export default async function Footer() {
  const aboutData = await getContentData<AboutData>("about");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent mt-16">
      <div className="container max-w-6xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-accent-foreground text-center md:text-left">
            © {currentYear} {aboutData.name}. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link
              href="#"
              className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="#projects"
              className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#skills"
              className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
