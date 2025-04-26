import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Education() {
  return (
    <section id="education" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Education</h2>

      <Card>
        <CardHeader>
          <CardTitle>Bachelor of Science in Computer Science</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-medium">PMAS ARID Agricultural University</p>
            <p className="text-muted-foreground">2016 - 2020</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Relevant Coursework:</h3>
            <p className="text-muted-foreground">
              Software Engineering, Data Structures & Algorithms, Database Systems, Web Development, Computer Networks,
              Artificial Intelligence, Operating Systems.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Languages:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Urdu (Native)</li>
              <li>English (Professional Working Proficiency)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
