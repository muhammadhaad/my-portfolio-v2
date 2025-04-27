import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Smartphone } from "lucide-react"
import { getContentByType } from "@/lib/markdown"

interface ProjectLink {
  type: string
  url: string
  label: string
}

interface Project {
  slug: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl: string
  androidUrl?: string
  iosUrl?: string
  additionalLinks?: ProjectLink[]
}

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await getContentByType("projects")
    return projects.map((project) => {
      // Extract any additional links from the frontmatter
      const additionalLinks: ProjectLink[] = []

      // Check for Android URL
      if (project.data.androidUrl) {
        additionalLinks.push({
          type: "android",
          url: project.data.androidUrl,
          label: "Android App",
        })
      }

      // Check for iOS URL
      if (project.data.iosUrl) {
        additionalLinks.push({
          type: "ios",
          url: project.data.iosUrl,
          label: "iOS App",
        })
      }

      // Check for any other custom links
      if (project.data.additionalLinks && Array.isArray(project.data.additionalLinks)) {
        additionalLinks.push(...project.data.additionalLinks)
      }

      return {
        slug: project.slug,
        title: project.data.title,
        description: project.data.description,
        image: project.data.image || "/placeholder.svg?height=300&width=600",
        technologies: project.data.technologies || [],
        liveUrl: project.data.liveUrl && project.data.liveUrl !== "#" ? project.data.liveUrl : undefined,
        githubUrl: project.data.githubUrl || "#",
        androidUrl: project.data.androidUrl,
        iosUrl: project.data.iosUrl,
        additionalLinks: additionalLinks.length > 0 ? additionalLinks : undefined,
      }
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function Projects() {
  const projects = await getProjects()

  // Fallback projects if no markdown files exist yet
  const fallbackProjects = [
    {
      slug: "healthcare-platform",
      title: "Healthcare Mobile Platform",
      description:
        "Led development of a healthcare platform enabling real-time access to medical records and appointment scheduling. Available on Play Store and App Store.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Flutter", "WebSockets", "Firebase", "MySQL"],
      githubUrl: "https://github.com/muhammadhaad/healthcare-platform",
      androidUrl: "https://play.google.com/store",
      iosUrl: "https://apps.apple.com",
    },
    {
      slug: "transportation-system",
      title: "On-Demand Transportation System",
      description:
        "Developed a transportation service with applications for riders, drivers, and admins. Features included GPS tracking, fare calculation, and ratings.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Flutter", "Node.js", "Google Maps API", "Firebase"],
      liveUrl: "https://example.com/transportation",
      githubUrl: "https://github.com/muhammadhaad/transportation-system",
    },
    {
      slug: "data-extraction-tools",
      title: "Data Extraction Tools",
      description: "Created web scrapers to extract structured data from job listings and e-commerce websites.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Python", "BeautifulSoup", "Pandas"],
      githubUrl: "https://github.com/muhammadhaad/data-extraction-tools",
    },
  ]

  const displayProjects = projects.length > 0 ? projects : fallbackProjects

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {displayProjects.map((project) => (
          <Card key={project.slug} className="overflow-hidden flex flex-col">
            <div className="relative h-48 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Link>
              </Button>

              {/* Only show live version button if liveUrl exists */}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Version
                  </Link>
                </Button>
              )}

              {/* Show Android and iOS links if they exist */}
              {project.androidUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link href={project.androidUrl} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Android
                  </Link>
                </Button>
              )}

              {project.iosUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link href={project.iosUrl} target="_blank" rel="noopener noreferrer">
                    <Smartphone className="mr-2 h-4 w-4" />
                    iOS
                  </Link>
                </Button>
              )}

              {/* Show any additional links */}
              {project.additionalLinks?.map((link, idx) => (
                <Button key={idx} variant="secondary" size="sm" asChild>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
