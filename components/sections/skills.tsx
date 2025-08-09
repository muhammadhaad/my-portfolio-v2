import { Badge } from "@/components/ui/badge"
import { skillsData } from "@/lib/generated-data"
import { Code2, Database, Globe, Smartphone, Wrench, Palette } from "lucide-react"

// Icon mapping for skill categories
const categoryIcons: { [key: string]: any } = {
  "Frontend Development": Globe,
  "Backend Development": Database,
  "Programming Languages": Code2,
  "Mobile Development": Smartphone,
  "Tools & Technologies": Wrench,
  "Design & UI/UX": Palette,
  "Database": Database,
  "DevOps": Wrench,
  "Framework": Code2,
  "Library": Code2,
}

// Get icon for category
function getCategoryIcon(category: string) {
  const IconComponent = categoryIcons[category] || Code2
  return IconComponent
}

// Skill proficiency levels (you can customize these based on your data)
const skillLevels: { [key: string]: number } = {
  "React.js": 95,
  "Next.js": 90,
  "TypeScript": 88,
  "JavaScript": 95,
  "Node.js": 85,
  "Python": 80,
  "Flutter": 85,
  "Firebase": 90,
  "MongoDB": 75,
  "PostgreSQL": 70,
  "Docker": 65,
  "Git": 90,
  "Tailwind CSS": 95,
  "HTML": 98,
  "CSS": 95,
}

export default function Skills() {
  
  return (
    <section id="skills" className="section-padding scroll-mt-16">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="section-badge-dot"></span>
            Technical Expertise
          </div>
          <h2 className="section-title">Skills</h2>
          <p className="section-description">
            Proficient in modern technologies and frameworks for full-stack development.
          </p>
        </div>

        <div className="responsive-grid-3">
        {skillsData.skills.map((category, index) => {
          const IconComponent = getCategoryIcon(category.category)
          
          return (
            <div key={category.category} className="skill-card group">
              <div className="card-header-modern">
                <div className="skill-category-icon">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="card-title-modern">{category.category}</h3>
              </div>
              
              <div className="card-content-modern flex-1">
                <div className="space-y-4">
                  {category.skills.map((skill, idx) => {
                    const proficiency = skillLevels[skill] || Math.floor(Math.random() * 30) + 70
                    
                    return (
                      <div key={`${category.category}-${skill}-${idx}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{skill}</span>
                          <span className="text-xs text-muted-foreground">{proficiency}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div 
                            className="skill-progress-fill" 
                            style={{ width: `${proficiency}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="card-footer-modern">
                <div className="card-tags-modern">
                  {category.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={`tag-${skill}-${idx}`} className="badge-tech">
                      {skill}
                    </Badge>
                  ))}
                  {category.skills.length > 3 && (
                    <Badge className="badge-outline">
                      +{category.skills.length - 3} more
                    </Badge>
                  )}
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
