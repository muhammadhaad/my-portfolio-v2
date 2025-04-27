import { Badge } from "@/components/ui/badge"
import { getContentByType } from "@/lib/markdown"

interface Experience {
  title: string
  company: string
  location: string
  period: string
  responsibilities: string[]
  technologies: string[]
}

async function getExperiences(): Promise<Experience[]> {
  try {
    const experiences = await getContentByType("experience")
    return experiences.map((exp) => {
      // Split content by lines and filter out empty lines to get responsibilities
      const responsibilities = exp.content
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.trim().substring(2).trim())

      return {
        title: exp.data.title,
        company: exp.data.company,
        location: exp.data.location,
        period: exp.data.period,
        responsibilities,
        technologies: exp.data.technologies || [],
      }
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return []
  }
}

export default async function Experience() {
  const experiences = await getExperiences()

  // Fallback experiences if no markdown files exist yet
  const fallbackExperiences = [
    {
      title: "Full Stack Developer",
      company: "Sahl (Remote)",
      location: "Riyadh, Saudi Arabia",
      period: "Aug 2024 - Present",
      responsibilities: [
        "Develop scalable web applications using Next.js frontend and NestJS backend with TypeScript.",
        "Configure Google Cloud Platform deployments, implementing security measures for cloud resources.",
        "Create shell scripts to automate GCP security configurations and service account management.",
        "Design RESTful APIs ensuring seamless frontend-backend integration.",
        "Lead technical architecture planning with focus on security and performance optimization.",
      ],
      technologies: ["Next.js", "NestJS", "TypeScript", "Google Cloud Platform", "RESTful APIs"],
    },
    {
      title: "Senior Software Developer",
      company: "PAF Hospital Islamabad",
      location: "Islamabad, Pakistan",
      period: "Jan 2023 - Feb 2025",
      responsibilities: [
        "Integrated WebSockets for real-time updates in hospital mobile app, reducing information delivery time by 40%.",
        "Developed key mobile app features that increased daily active users by 25%.",
        "Optimized backend APIs, reducing response times by 30%.",
        "Collaborated with medical staff to implement healthcare workflows into digital solutions.",
      ],
      technologies: ["Flutter", "WebSockets", "APIs", "Healthcare Solutions"],
    },
    {
      title: "Software Developer",
      company: "Air Headquarters — Astrontech",
      location: "Islamabad, Pakistan",
      period: "Jul 2021 - Dec 2022",
      responsibilities: [
        "Built Flutter-based mobile applications used by 5,000+ daily users in a hospital environment.",
        "Developed a Queue Management System with thermal printer integration, reducing wait times by 20%.",
        "Created a real-time dashboard for hospital resource monitoring used by 15+ departments.",
        "Implemented secure authentication systems ensuring patient data privacy.",
      ],
      technologies: ["Flutter", "Mobile Development", "Queue Management", "Authentication"],
    },
  ]

  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences

  return (
    <section id="experience" className="py-16">
      <h2 className="text-3xl font-bold mb-12">Experience</h2>

      <div className="space-y-12">
        {displayExperiences.map((exp, index) => (
          <div key={index} className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="text-sm text-muted-foreground">{exp.period}</div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>

              <ul className="space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="experience-item">
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
