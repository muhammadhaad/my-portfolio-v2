"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Mail, MessageSquare, Send, Github, Linkedin, Phone, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setFormStatus({
        type: "success",
        message: "Your message has been sent successfully! I will get back to you soon.",
      })

      e.currentTarget.reset()

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
      })

      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Me
            </CardTitle>
            <CardDescription>
              Fill out the form below to send me a message. I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} required />
              </div>

              {formStatus.type && (
                <Alert variant={formStatus.type === "success" ? "default" : "destructive"}>
                  {formStatus.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{formStatus.type === "success" ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
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
                <a href="mailto:muhammadhaad618@gmail.com" className="hover:underline">
                  muhammadhaad618@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">+92(316) 589-0766</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">Rawalpindi, Pakistan</p>
            </div>
            <div>
              <h3 className="font-semibold">Social Media</h3>
              <div className="flex gap-4 mt-2">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/muhammadhaad" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://linkedin.com/in/muhammadhaad" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="tel:+923165890766" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Phone</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </section>
  )
}
