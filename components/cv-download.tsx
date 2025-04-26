"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Replace with your actual CV file URL
const CV_URL = "https://drive.google.com/uc?export=download&id=your-file-id"
const CV_VIEW_URL = "https://drive.google.com/file/d/your-file-id/view"

export default function CVDownload() {
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      setDownloadStatus("downloading")

      // For direct download from Google Drive
      window.location.href = CV_URL

      // Show success message after a short delay
      setTimeout(() => {
        setDownloadStatus("success")

        // Clear the status after 3 seconds
        setTimeout(() => {
          setDownloadStatus(null)
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error("Download error:", error)
      setDownloadStatus("error")

      // Clear the error status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(null)
      }, 3000)
    }
  }

  return (
    <section className="py-8">
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            My Curriculum Vitae
          </CardTitle>
          <CardDescription>
            Download my CV to learn more about my experience, skills, and qualifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Get a comprehensive overview of my professional background, technical skills, and project experience.
            </p>

            {downloadStatus === "success" && (
              <Alert variant="default" className="mt-2 bg-green-500/10 text-green-500 border-green-500/20">
                <AlertDescription>Download started successfully!</AlertDescription>
              </Alert>
            )}

            {downloadStatus === "error" && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>Download failed. Please try again or view online.</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="default"
              className="gap-2"
              onClick={handleDownload}
              disabled={downloadStatus === "downloading"}
            >
              <Download className="h-4 w-4" />
              {downloadStatus === "downloading" ? "Downloading..." : "Download CV"}
            </Button>

            <Button variant="outline" asChild>
              <a href={CV_VIEW_URL} target="_blank" rel="noopener noreferrer">
                View Online
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
