"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  Phone,
  User,
} from "lucide-react";
import { getContentData, type AboutData, createMailtoLink } from "@/lib/utils";
import Link from "next/link";

export default async function Contact() {
  const aboutData = await getContentData<AboutData>("about");

  return (
    <section id="contact" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              Have a project in mind? Let's discuss how we can work together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link
                  href={createMailtoLink(
                    "Contact from Portfolio Website",
                    "Hello Muhammad,\n\nI'd like to discuss..."
                  )}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground break-all">
                  <a
                    href={`mailto:${aboutData.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {aboutData.email}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">{aboutData.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted-foreground">{aboutData.location}</p>
              </div>
              <div>
                <h3 className="font-semibold">Social Media</h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={aboutData.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={aboutData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
