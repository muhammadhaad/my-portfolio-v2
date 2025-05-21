import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone } from "lucide-react"
import { projectsData } from "@/lib/static-data"
import ProjectImage from "./project-image"

export default function Projects() {
  return (
    <section id="projects" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {projectsData.map((project) => (
          <Card key={project.slug} className="overflow-hidden flex flex-col">
            <div className="relative h-48 w-full">
              <ProjectImage src={project.image || "/placeholder.svg?height=300&width=600"} alt={project.title} />
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
              {/* Show Android and iOS links only for Healthcare Mobile Platform */}
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
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
