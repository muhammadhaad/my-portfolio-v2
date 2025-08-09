import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experiencesData } from "@/lib/generated-data"

export default function Experience() {
  // Sort experiences by order
  const sortedExperiences = experiencesData.sort((a, b) => a.order - b.order)

  return (
    <section id="experience" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-12">Experience</h2>

      <div className="space-y-12">
        {sortedExperiences.map((exp, index) => (
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
                  <li key={`${exp.company}-resp-${idx}`} className="experience-item">
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech, idx) => (
                  <Badge key={`${exp.company}-tech-${tech}-${idx}`} variant="secondary">
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
