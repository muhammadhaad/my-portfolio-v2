import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import matter from "gray-matter"

// Only import fs and path when running on server
let fs: typeof import('fs')
let path: typeof import('path')
if (typeof window === 'undefined') {
  fs = require('fs')
  path = require('path')
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface AboutData {
  name: string
  title: string
  description: string
  greeting: string
  tagline: string
  email: string
  phone: string
  location: string
  cvUrl: string
  cvDownloadUrl: string
  profileImage: string
  social: {
    github: string
    linkedin: string
  }
  content: string
}

export interface EducationData {
  id: string
  degree: string
  institution: string
  period: string
  languages: string[]
  courses: string[]
  content: string
  order: number
}

export interface ProjectData {
  id: string
  content: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  androidUrl?: string
  iosUrl?: string
  order: number
}

export interface JobData {
  id: string
  content: string
  title: string
  company: string
  location: string
  date: string
  period: string
  responsibilities: string[]
  technologies: string[]
  order: number
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createMailtoLink(subject: string, body?: string) {
  const params = new URLSearchParams();
  params.append("subject", subject);
  if (body) {
    params.append("body", body);
  }
  return `mailto:muhammadhaad618@gmail.com?${params.toString()}`;
}

// Read and parse markdown files from content directory
export async function getContentData<T extends ProjectData | JobData | AboutData | EducationData>(
  contentType: T extends ProjectData
    ? "projects"
    : T extends JobData
    ? "jobs"
    : T extends EducationData
    ? "education"
    : "about"
): Promise<T extends AboutData ? T : T[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getContentData can only be called from server-side code')
  }

  let contentDirectory = path.join(process.cwd(), "content")

  if (contentType !== "about") {
    contentDirectory = path.join(contentDirectory, contentType)
  }

  if (contentType === "about") {
    // Handle single about.md file
    const filePath = path.join(contentDirectory, "about.md")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    return { ...data, content } as T extends AboutData ? T : never
  }

  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = fs.readdirSync(dirPath)

    files.forEach(file => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
      } else if (file === "index.md" || (contentType === "projects" && file.endsWith(".md"))) {
        arrayOfFiles.push(filePath)
      }
    })

    return arrayOfFiles
  }

  const fileNames = getAllFiles(contentDirectory)

  const allContentData = fileNames
    .map(filePath => {
      const id = contentType === "jobs" || contentType === "education"
        ? path.basename(path.dirname(filePath))
        : path.basename(filePath, ".md")

      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        id,
        content,
        ...data,
      }
    })
    .sort((a, b) => ((a as any).order || 0) - ((b as any).order || 0))

  return allContentData as any
}

export async function getSkills(): Promise<SkillCategory[]> {
  const filePath = path.join(process.cwd(), "content", "skills.md")
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data } = matter(fileContents)
  return data.categories
}
