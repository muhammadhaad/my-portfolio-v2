import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Apple, PlaySquare } from "lucide-react";
import { projectsData } from "@/lib/data";
import Image from "next/image";

// Group technologies by category
const technologyCategories = {
  frontend: [
    "React.js",
    "Next.js",
    "Flutter",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "UI",
    "UX",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "Express",
    "RESTful APIs",
    "WebSockets",
    "GraphQL",
  ],
  database: ["Firebase", "MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  mobile: ["Flutter", "React Native", "Android", "iOS"],
  tools: ["Git", "Docker", "Google Maps API", "Authentication"],
  languages: ["JavaScript", "TypeScript", "Python", "Dart"],
  libraries: ["BeautifulSoup", "Pandas"],
};

// Function to categorize technologies
type TechnologyCategory = keyof typeof technologyCategories;
type CategorizedTechnologies = {
  [key in TechnologyCategory]?: string[];
} & { other?: string[] };

function categorizeTechnologies(techs: string[]): CategorizedTechnologies {
  const categorized: CategorizedTechnologies = {};

  techs.forEach((tech: string) => {
    let found = false;
    for (const [category, categoryTechs] of Object.entries(
      technologyCategories
    )) {
      if (
        categoryTechs.some((t) => tech.toLowerCase().includes(t.toLowerCase()))
      ) {
        if (!categorized[category as TechnologyCategory])
          categorized[category as TechnologyCategory] = [];
        categorized[category as TechnologyCategory]!.push(tech);
        found = true;
        break;
      }
    }

    if (!found) {
      if (!categorized["other"]) categorized["other"] = [];
      categorized["other"]!.push(tech);
    }
  });

  return categorized;
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectsData.map((project) => {
          const categorizedTech = categorizeTechnologies(project.technologies);
          const isHealthcareProject = project.slug === "healthcare-platform";

          return (
            <Card
              key={project.slug}
              className="overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image container */}
              <div className="relative h-48 w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                {/* Project title */}
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

                {/* Project description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technology categories - simplified */}
                <div className="mt-auto">
                  {Object.entries(categorizedTech).map(([category, techs]) => (
                    <div key={category} className="mb-2">
                      <h4 className="text-xs font-medium text-muted-foreground mb-1">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {(techs as string[]).map(
                          (tech: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs px-1.5 py-0"
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* App store links - only for Healthcare project */}
                {isHealthcareProject && (
                  <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-border">
                    {project.androidUrl && (
                      <Link
                        href={project.androidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-secondary transition-colors duration-300 text-muted-foreground hover:text-foreground"
                        title="Google Play Store"
                      >
                        <PlaySquare className="h-5 w-5" />
                        <span className="sr-only">Google Play Store</span>
                      </Link>
                    )}

                    {project.iosUrl && (
                      <Link
                        href={project.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-secondary transition-colors duration-300 text-muted-foreground hover:text-foreground"
                        title="Apple App Store"
                      >
                        <Apple className="h-5 w-5" />
                        <span className="sr-only">Apple App Store</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
