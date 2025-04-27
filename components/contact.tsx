"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Github, Linkedin, Phone } from "lucide-react"
import { siteConfig, createMailtoLink } from "@/lib/data"
import Link from "next/link"

export default function Contact() {
  return (
    <section id="contact" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Me
            </CardTitle>
            <CardDescription>
              Click the button below to send me an email. I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              I'm always interested in hearing about new projects, opportunities, or just connecting with fellow
              developers.
            </p>

            <div className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link
                  href={createMailtoLink("Contact from Portfolio Website", "Hello Muhammad,\n\nI'd like to discuss...")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Or email me directly at:{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline hover:text-primary">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Let's Connect
            </CardTitle>
            <CardDescription>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">{siteConfig.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">{siteConfig.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Social Media</h3>
              <div className="flex gap-4 mt-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}>
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Phone</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
