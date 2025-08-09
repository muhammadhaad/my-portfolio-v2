import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Apple, PlaySquare, ExternalLink, Github, Globe, Smartphone, Database, Code, Layers, Wrench } from "lucide-react";
import { projectsData } from "@/lib/generated-data";
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

// Function to get category icon
function getCategoryIcon(category: string) {
  switch (category) {
    case 'frontend':
      return <Globe className="h-3 w-3" />;
    case 'backend':
      return <Code className="h-3 w-3" />;
    case 'database':
      return <Database className="h-3 w-3" />;
    case 'mobile':
      return <Smartphone className="h-3 w-3" />;
    case 'tools':
      return <Wrench className="h-3 w-3" />;
    case 'languages':
      return <Layers className="h-3 w-3" />;
    default:
      return <Code className="h-3 w-3" />;
  }
}

// Function to get project status badge
function getProjectStatus(project: any) {
  if (project.androidUrl || project.iosUrl) {
    return { text: 'Live', variant: 'default' as const };
  }
  if (project.githubUrl) {
    return { text: 'Open Source', variant: 'secondary' as const };
  }
  return { text: 'Completed', variant: 'outline' as const };
}

export default function Projects() {
  
  return (
    <section id="projects" className="section-padding scroll-mt-16">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="section-badge-dot"></span>
            Portfolio Showcase
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Innovative solutions built with modern technologies and best practices.
          </p>
        </div>

        <div className="responsive-grid-3">
        {projectsData.map((project) => {
          const categorizedTech = categorizeTechnologies(project.technologies);
          const projectStatus = getProjectStatus(project);

          return (
            <div key={project.slug} className="project-card group">
              {/* Project Image with Overlay */}
              <div className="card-header-modern relative overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Project Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={projectStatus.variant}
                    className="text-xs font-medium backdrop-blur-sm bg-background/80"
                  >
                    {projectStatus.text}
                  </Badge>
                </div>

                {/* Project Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Content */}
              <div className="card-content-modern">
                {/* Project Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technology Stack */}
                <div className="space-y-3">
                  {Object.entries(categorizedTech).map(([category, techs]) => (
                    <div key={category} className="tech-category">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-primary">
                          {getCategoryIcon(category)}
                        </div>
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(techs as string[]).slice(0, 4).map(
                          (tech: string, idx: number) => (
                            <Badge
                              key={`${category}-${tech}-${idx}`}
                              variant="secondary"
                              className="text-xs px-2 py-1 bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                        {(techs as string[]).length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-1 text-muted-foreground"
                          >
                            +{(techs as string[]).length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Footer with Actions */}
              <div className="card-footer-modern">
                <div className="flex items-center justify-between">
                  {/* Project Links */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-md transition-all duration-200"
                        title="View Source Code"
                      >
                        <Github className="h-3 w-3" />
                        Code
                      </Link>
                    )}
                    
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-md transition-all duration-200"
                        title="View Live Demo"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </Link>
                    )}
                  </div>

                  {/* App Store Links */}
                  {(project.androidUrl || project.iosUrl) && (
                    <div className="flex items-center gap-2">
                      {project.androidUrl && (
                        <Link
                          href={project.androidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-secondary transition-colors duration-200 text-muted-foreground hover:text-foreground"
                          title="Google Play Store"
                        >
                          <PlaySquare className="h-4 w-4" />
                          <span className="sr-only">Google Play Store</span>
                        </Link>
                      )}

                      {project.iosUrl && (
                        <Link
                          href={project.iosUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-secondary transition-colors duration-200 text-muted-foreground hover:text-foreground"
                          title="Apple App Store"
                        >
                          <Apple className="h-4 w-4" />
                          <span className="sr-only">Apple App Store</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
