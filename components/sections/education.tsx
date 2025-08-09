import { Badge } from "@/components/ui/badge"
import { educationData } from "@/lib/generated-data"
import { GraduationCap, School, Calendar, BookOpen, Globe, Award, MapPin } from "lucide-react"

// Education level mapping for icons
const educationIcons: { [key: string]: any } = {
  "Bachelor": School,
  "Master": GraduationCap,
  "PhD": Award,
  "Certificate": BookOpen,
  "Diploma": School,
}

// Get education icon based on degree type
function getEducationIcon(degree: string) {
  if (degree.includes('Bachelor') || degree.includes('BS') || degree.includes('BA')) return educationIcons.Bachelor
  if (degree.includes('Master') || degree.includes('MS') || degree.includes('MA') || degree.includes('MBA')) return educationIcons.Master
  if (degree.includes('PhD') || degree.includes('Doctorate')) return educationIcons.PhD
  if (degree.includes('Certificate')) return educationIcons.Certificate
  return School
}

// Calculate education duration
function calculateEducationDuration(period: string): string {
  const parts = period.split(' - ')
  if (parts.length === 2) {
    const startYear = parseInt(parts[0])
    const endYear = parts[1].toLowerCase() === 'present' ? new Date().getFullYear() : parseInt(parts[1])
    const duration = endYear - startYear
    return `${duration} year${duration > 1 ? 's' : ''}`
  }
  return '4 years'
}

export default function Education() {
  return (
    <section id="education" className="section-padding scroll-mt-16">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="section-badge-dot"></span>
            Academic Background
          </div>
          <h2 className="section-title">Education</h2>
          <p className="section-description">
            Strong foundation in computer science and software engineering principles.
          </p>
        </div>

        <div className="responsive-grid-2">
          {[educationData].map((edu, index) => {
            const EducationIcon = getEducationIcon(edu.degree)
            const duration = calculateEducationDuration(edu.period)
            
            return (
              <div key={index} className="education-card group">
                <div className="card-header-modern">
                  <div className="flex items-start gap-4">
                    <div className="education-icon">
                      <EducationIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="card-title-modern">{edu.degree}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <School className="w-4 h-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>{duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-content-modern space-y-6">
                  {edu.coursework && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>Key Coursework</span>
                      </div>
                      <div className="education-coursework">
                        {edu.coursework.split(', ').map((course, idx) => (
                          <div key={idx} className="education-course-item">
                            <div className="education-course-bullet" />
                            <span className="text-sm text-muted-foreground">{course.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {edu.languages && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Globe className="w-4 h-4 text-primary" />
                        <span>Languages</span>
                      </div>
                      <div className="card-tags-modern">
                        {edu.languages.map((lang, idx) => (
                          <Badge key={idx} className="badge-language">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="card-footer-modern">
                  <div className="education-footer-info">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>Academic Institution</span>
                    </div>
                    <div className="education-degree-badge">
                      {edu.degree.split(' ')[0]} Degree
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
