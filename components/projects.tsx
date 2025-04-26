import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Healthcare Mobile Platform",
      description:
        "Led development of a healthcare platform enabling real-time access to medical records and appointment scheduling. Available on Play Store and App Store.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Flutter", "WebSockets", "Firebase", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/muhammadhaad/healthcare-platform",
    },
    {
      title: "On-Demand Transportation System",
      description:
        "Developed a transportation service with applications for riders, drivers, and admins. Features included GPS tracking, fare calculation, and ratings.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Flutter", "Node.js", "Google Maps API", "Firebase"],
      liveUrl: "#",
      githubUrl: "https://github.com/muhammadhaad/transportation-system",
    },
    {
      title: "Data Extraction Tools",
      description: "Created web scrapers to extract structured data from job listings and e-commerce websites.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Python", "BeautifulSoup", "Pandas"],
      liveUrl: "#",
      githubUrl: "https://github.com/muhammadhaad/data-extraction-tools",
    },
  ]

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
