// Static data for projects and experiences to avoid file system operations

export const projectsData = [
  {
    slug: "healthcare-platform",
    title: "Healthcare Mobile Platform",
    description:
      "A comprehensive healthcare solution that revolutionized patient access to medical records and appointment scheduling. Reduced information delivery time by 40% and increased daily active users by 25% through intuitive UI and real-time updates.",
    image: "/images/healthcare.png",
    technologies: ["Flutter", "WebSockets", "Firebase", "MySQL", "RESTful APIs", "Authentication"],
    androidUrl: "https://play.google.com/store",
    iosUrl: "https://apps.apple.com",
  },
  {
    slug: "transportation-system",
    title: "On-Demand Transportation System",
    description:
      "Developed a full-featured transportation service with separate applications for riders, drivers, and administrators. Implemented real-time GPS tracking, automated fare calculation, and route optimization that improved driver efficiency by 15%.",
    image: "/images/transportation.png",
    technologies: ["Flutter", "Node.js", "Google Maps API", "Firebase", "Payment Processing", "Real-time Tracking"],
  },
  {
    slug: "data-extraction-tools",
    title: "Data Extraction Tools",
    description:
      "Built a suite of web scrapers and data processing tools that extract structured information from various online sources. Automated data collection processes reduced manual effort by 80% and improved data accuracy by implementing robust validation algorithms.",
    image: "/images/extraction.png",
    technologies: ["Python", "BeautifulSoup", "Pandas", "Data Processing", "Automation", "Web Scraping"],
  },
]

export const experiencesData = [
  {
    title: "Full Stack Developer",
    company: "Sahl",
    location: "Riyadh, Saudi Arabia (Remote)",
    period: "Mar 2025 - Present",
    responsibilities: [
      "Develop scalable web applications using Next.js frontend and NestJS backend with TypeScript.",
      "Configure Google Cloud Platform deployments, implementing security measures for cloud resources.",
      "Create shell scripts to automate GCP security configurations and service account management.",
      "Design RESTful APIs ensuring seamless frontend-backend integration.",
      "Lead technical architecture planning with focus on security and performance optimization.",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "Google Cloud Platform", "RESTful APIs"],
  },
  {
    title: "Senior Software Developer",
    company: "PAF Hospital Islamabad",
    location: "Islamabad, Pakistan",
    period: "Jan 2023 - Feb 2025",
    responsibilities: [
      "Integrated WebSockets for real-time updates in hospital mobile app, reducing information delivery time by 40%.",
      "Developed key mobile app features that increased daily active users by 25%.",
      "Optimized backend APIs, reducing response times by 30%.",
      "Collaborated with medical staff to implement healthcare workflows into digital solutions.",
    ],
    technologies: ["Flutter", "WebSockets", "APIs", "Healthcare Solutions"],
  },
  {
    title: "Software Developer",
    company: "Air Headquarters — Astrontech",
    location: "Islamabad, Pakistan",
    period: "Jul 2021 - Dec 2022",
    responsibilities: [
      "Built Flutter-based mobile applications used by 5,000+ daily users in a hospital environment.",
      "Developed a Queue Management System with thermal printer integration, reducing wait times by 20%.",
      "Created a real-time dashboard for hospital resource monitoring used by 15+ departments.",
      "Implemented secure authentication systems ensuring patient data privacy.",
    ],
    technologies: ["Flutter", "Mobile Development", "Queue Management", "Authentication"],
  },
]

export const skillsData = [
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

export const educationData = {
  degree: "Bachelor of Science in Computer Science",
  institution: "PMAS ARID Agricultural University",
  period: "2016 - 2020",
  coursework:
    "Software Engineering, Data Structures & Algorithms, Database Systems, Web Development, Computer Networks, Artificial Intelligence, Operating Systems.",
  languages: ["Urdu (Native)", "English (Professional Working Proficiency)"],
}
