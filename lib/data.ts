// Site configuration
export const siteConfig = {
  name: "Muhammad Haad",
  title: "Full Stack Developer",
  description: "Passionate Full Stack Developer with expertise in modern web technologies, mobile app development, and automation solutions. Experienced in React, Next.js, Flutter, Node.js, and cloud technologies.",
  email: "muhammadhaad.dev@gmail.com",
  phone: "+92 300 1234567",
  location: "Islamabad, Pakistan",
  cvUrl: "https://drive.google.com/file/d/1abc123/view",
  cvDownloadUrl: "https://drive.google.com/uc?export=download&id=1abc123",
  profileImage: "/images/profile.png",
  social: {
    github: "https://github.com/muhammadhaad",
    linkedin: "https://linkedin.com/in/muhammadhaad",
    twitter: "https://twitter.com/muhammadhaad",
    instagram: "https://instagram.com/muhammadhaad"
  }
}

// Projects data
export const projectsData = [
  {
    title: "Healthcare Management Platform",
    description: "A comprehensive healthcare platform built with Flutter and Firebase, featuring appointment scheduling, secure messaging, prescription management, and hospital system integration.",
    image: "/images/healthcare.png",
    technologies: ["Flutter", "Firebase", "WebSocket", "MySQL", "Node.js"],
    liveUrl: "https://healthcare-demo.com",
    githubUrl: "https://github.com/muhammadhaad/healthcare-platform",
    androidUrl: "https://play.google.com/store/apps/details?id=com.healthcare.app",
    iosUrl: "https://apps.apple.com/app/healthcare-platform/id123456789",
    order: 1
  },
  {
    title: "Transportation Management System",
    description: "A modern transportation system with real-time tracking, route optimization, and fleet management capabilities.",
    image: "/images/transportation.png",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Google Maps API"],
    liveUrl: "https://transport-system.com",
    githubUrl: "https://github.com/muhammadhaad/transport-system",
    order: 2
  },
  {
    title: "Data Extraction & Automation Tools",
    description: "Advanced automation tools for data extraction, processing, and analysis with support for multiple data sources and formats.",
    image: "/images/extraction.png",
    technologies: ["Python", "Selenium", "BeautifulSoup", "Pandas", "FastAPI"],
    githubUrl: "https://github.com/muhammadhaad/data-extraction-tools",
    order: 3
  },
  {
    title: "Process Automation Suite",
    description: "Comprehensive automation solution for business processes, workflow management, and task scheduling.",
    image: "/images/automation.png",
    technologies: ["Python", "Celery", "Redis", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/muhammadhaad/automation-suite",
    order: 4
  }
]

// Experience data
export const experiencesData = [
  {
    title: "Full Stack Developer",
    company: "Sahl",
    period: "2023 - Present",
    description: "Leading full-stack development projects with modern technologies.",
    responsibilities: [
      "Developed and maintained web applications using React and Node.js",
      "Implemented responsive UI/UX designs with Tailwind CSS",
      "Built RESTful APIs and integrated third-party services",
      "Collaborated with cross-functional teams in agile environment"
    ],
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    achievements: [
      "Improved application performance by 40%",
      "Successfully delivered 5+ major projects on time",
      "Mentored junior developers and conducted code reviews"
    ],
    order: 1
  },
  {
    title: "Automation Engineer",
    company: "Freelance",
    period: "2022 - 2023",
    description: "Specialized in creating automation solutions for various business processes.",
    responsibilities: [
      "Developed custom automation scripts and tools",
      "Implemented web scraping solutions for data collection",
      "Created automated testing frameworks",
      "Provided consultation on process optimization"
    ],
    technologies: ["Python", "Selenium", "BeautifulSoup", "Pandas", "Docker"],
    achievements: [
      "Reduced manual work by 80% for clients",
      "Delivered 20+ automation projects",
      "Achieved 99% accuracy in data extraction tasks"
    ],
    order: 2
  },
  {
    title: "Senior Software Developer",
    company: "PAF Hospital Islamabad",
    period: "2021 - 2022",
    description: "Developed healthcare management systems and mobile applications.",
    responsibilities: [
      "Integrated WebSocket technology for real-time communication",
      "Developed mobile app features using Flutter",
      "Optimized backend APIs for better performance",
      "Collaborated with medical staff to understand requirements"
    ],
    technologies: ["Flutter", "Node.js", "WebSocket", "MySQL", "Firebase"],
    achievements: [
      "Improved patient management efficiency by 50%",
      "Successfully launched mobile app with 1000+ users",
      "Reduced system response time by 60%"
    ],
    order: 3
  },
  {
    title: "Software Developer",
    company: "Air Headquarters — Astrontech",
    period: "2020 - 2021",
    description: "Worked on defense-related software applications and systems.",
    responsibilities: [
      "Developed desktop applications using modern frameworks",
      "Implemented security protocols and data encryption",
      "Created automated reporting systems",
      "Maintained legacy systems and performed upgrades"
    ],
    technologies: ["C#", ".NET", "SQL Server", "WPF", "Crystal Reports"],
    achievements: [
      "Enhanced system security by implementing encryption",
      "Automated reporting processes saving 20 hours/week",
      "Successfully migrated legacy systems to modern architecture"
    ],
    order: 4
  }
]

// Skills data
export const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "PHP", "Laravel"]
  },
  {
    category: "Programming",
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "Dart", "PHP"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis", "SQLite"]
  },
  {
    category: "DevOps",
    skills: ["Docker", "AWS", "Google Cloud", "Vercel", "Netlify", "GitHub Actions"]
  },
  {
    category: "Automation Tools",
    skills: ["Selenium", "BeautifulSoup", "Pandas", "Celery", "Puppeteer"]
  },
  {
    category: "Other",
    skills: ["Git", "REST APIs", "GraphQL", "WebSocket", "Flutter", "React Native"]
  }
]

// Education data
export const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Engineering and Technology",
    period: "2018 - 2022",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Web Development"],
    languages: ["English", "Urdu", "Punjabi"]
  }
]

// Helper function to create mailto link with subject and body
export function createMailtoLink(subject = "", body = "") {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `mailto:${siteConfig.email}?subject=${encodedSubject}&body=${encodedBody}`
}
