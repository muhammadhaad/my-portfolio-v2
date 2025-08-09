import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { educationData } from "@/lib/generated-data"

export default function Education() {
  const education = educationData;
  
  return (
    <section id="education" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">Education</h2>

      <Card>
        <CardHeader>
          <CardTitle>{education.degree}</CardTitle>
          <p className="text-muted-foreground">
            {education.institution} • {education.period}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Relevant Coursework:</h3>
            <p className="text-muted-foreground">{education.coursework}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Languages:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {education.languages.map((language, index) => (
                <li key={`language-${language}-${index}`}>{language}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
