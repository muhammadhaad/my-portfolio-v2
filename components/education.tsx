import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { educationData } from "@/lib/static-data"

export default function Education() {
  return (
    <section id="education" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8">Education</h2>

      <Card>
        <CardHeader>
          <CardTitle>{educationData.degree}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">{educationData.institution}</p>
            <p className="text-muted-foreground">{educationData.period}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Relevant Coursework:</h3>
            <p className="text-muted-foreground">{educationData.coursework}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Languages:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {educationData.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
