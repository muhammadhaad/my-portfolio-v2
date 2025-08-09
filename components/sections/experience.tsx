import { Badge } from "@/components/ui/badge"
import { experiencesData } from "@/lib/generated-data"
import { Building2, MapPin, Calendar, Trophy, Users, Code } from "lucide-react"

// Company type mapping for icons
const companyTypeIcons: { [key: string]: any } = {
  "Startup": Building2,
  "Enterprise": Building2,
  "Agency": Users,
  "Freelance": Code,
}

// Get company icon based on company name or type
function getCompanyIcon(company: string) {
  // You can customize this logic based on your company types
  if (company.includes('Startup') || company.includes('Tech')) return companyTypeIcons.Startup
  if (company.includes('Corp') || company.includes('Inc')) return companyTypeIcons.Enterprise
  if (company.includes('Agency') || company.includes('Studio')) return companyTypeIcons.Agency
  return Building2
}

// Calculate duration from period string
function calculateDuration(period: string): string {
  // Simple duration calculation - you can make this more sophisticated
  const parts = period.split(' - ')
  if (parts.length === 2) {
    const start = parts[0]
    const end = parts[1]
    if (end.toLowerCase() === 'present') {
      return 'Current'
    }
    // For demo purposes, return a sample duration
    return '2+ years'
  }
  return '1+ year'
}

export default function Experience() {
  // Sort experiences by order
  const sortedExperiences = experiencesData.sort((a, b) => a.order - b.order)

  return (
    <section id="experience" className="section-padding scroll-mt-16">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="section-badge-dot"></span>
            Professional Journey
          </div>
          <h2 className="section-title">Experience</h2>
          <p className="section-description">
            Building innovative solutions and leading development teams across various industries.
          </p>
        </div>

        <div className="space-y-8">
          {sortedExperiences.map((exp, index) => {
            const CompanyIcon = getCompanyIcon(exp.company)
            const duration = calculateDuration(exp.period)
            const isLatest = index === 0
            
            return (
              <div key={index} className="experience-card group">
                {/* Timeline connector */}
                <div className="experience-timeline">
                  <div className={`experience-timeline-dot ${isLatest ? 'current' : ''}`}>
                    <CompanyIcon className="w-4 h-4" />
                  </div>
                  {index < sortedExperiences.length - 1 && (
                    <div className="experience-timeline-line" />
                  )}
                </div>
                
                {/* Card content */}
                <div className="experience-content">
                  <div className="card-header-modern">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="card-title-modern">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="experience-period-badge">
                        {exp.period}
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content-modern">
                    {/* Key achievements section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Trophy className="w-4 h-4 text-primary" />
                        <span>Key Achievements</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li key={`${exp.company}-resp-${idx}`} className="experience-achievement">
                            <div className="experience-achievement-bullet" />
                            <span className="text-sm text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card-footer-modern">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Code className="w-4 h-4 text-primary" />
                        <span>Technologies Used</span>
                      </div>
                      <div className="card-tags-modern">
                        {exp.technologies.map((tech, idx) => (
                          <Badge key={`${exp.company}-tech-${tech}-${idx}`} className="badge-tech">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
