import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skillsData } from "@/lib/generated-data"

export default function Skills() {
  
  return (
    <section id="skills" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.skills.map((category, index) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <Badge key={`${category.category}-${skill}-${idx}`} variant="secondary">
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
