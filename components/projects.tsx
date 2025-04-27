"use server";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github, Globe, Smartphone } from "lucide-react";
import { getContentData, type ProjectData } from "@/lib/utils";

export default async function Projects() {
  const projectsData = await getContentData<ProjectData>("projects");

  return (
    <section id="projects" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {projectsData.map((project) => (
          <Card key={project.title} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full aspect-[16/9] mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 pt-4">
              {project.liveUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source
                  </Link>
                </Button>
              )}
              {project.androidUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link
                    href={project.androidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Android
                  </Link>
                </Button>
              )}
              {project.iosUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <Link
                    href={project.iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
  );
}
