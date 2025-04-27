"use server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getContentData, type JobData } from "@/lib/utils";

export default async function Experience() {
  const experiencesData = await getContentData<JobData>("jobs");

  // Parse responsibilities from markdown content
  const jobsWithResponsibilities = experiencesData.map((job) => ({
    ...job,
    responsibilities: job.content
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.trim().substring(2).trim()),
  }));

  return (
    <section id="experience" className="py-16 scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Work Experience</h2>
      <div className="grid grid-cols-1 gap-6 px-4 md:px-0">
        {jobsWithResponsibilities.map((job) => (
          <Card key={job.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="md:w-48 lg:w-64 shrink-0">
                  <h3 className="font-semibold text-lg">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.location}
                  </p>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg mb-2">{job.title}</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground marker:text-primary">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-sm sm:text-base">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
