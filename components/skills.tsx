import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["Next.js", "React.js", "Flutter", "HTML/CSS", "Tailwind CSS"],
    },
    {
      category: "Backend",
      skills: ["NestJS", "Node.js", "RESTful APIs", "WebSockets"],
    },
    {
      category: "Programming",
      skills: ["JavaScript", "TypeScript", "Dart", "Python"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"],
    },
    {
      category: "DevOps",
      skills: ["Google Cloud Platform", "Docker", "Codemagic", "Git"],
    },
    {
      category: "Other",
      skills: ["Shell Scripting", "JWT Authentication", "Jira", "Agile Methodologies"],
    },
  ]

  return (
    <section id="skills" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
