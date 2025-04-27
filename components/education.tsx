"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getContentData, type EducationData } from "@/lib/utils";

export default async function Education() {
  const educationData = await getContentData<EducationData>("education");

  return (
    <section id="education" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <div className="grid grid-cols-1 gap-6 px-4 md:px-0">
        {educationData.map((education) => (
          <Card key={education.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <CardTitle className="text-xl">{education.degree}</CardTitle>
                  <p className="text-muted-foreground">
                    {education.institution}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground shrink-0">
                  {education.period}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="prose dark:prose-invert max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: education.content }}
                />
                {education.languages && education.languages.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Languages:</h3>
                    <div className="flex flex-wrap gap-2">
                      {education.languages.map((language, idx) => (
                        <Badge key={idx} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {education.courses && education.courses.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Key Courses:</h3>
                    <div className="flex flex-wrap gap-2">
                      {education.courses.map((course, idx) => (
                        <Badge key={idx} variant="secondary">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
