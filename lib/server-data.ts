import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

// Load basic info from markdown
export function loadBasicInfo() {
  const filePath = path.join(contentDirectory, 'basic-info.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data
}

// Load education from markdown
export function loadEducation() {
  const filePath = path.join(contentDirectory, 'education.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data
}

// Load skills from markdown
export function loadSkills() {
  const filePath = path.join(contentDirectory, 'skills.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data
}

// Load all experience from markdown files
export function loadExperiences() {
  const experienceDirectory = path.join(contentDirectory, 'experience')
  const filenames = fs.readdirSync(experienceDirectory)
  
  const experiences = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(experienceDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Extract responsibilities from content
      const responsibilities = extractResponsibilities(content)
      
      return {
        title: data.title,
        company: data.company,
        location: data.location,
        period: data.period,
        responsibilities,
        technologies: data.technologies || [],
        order: data.order || 999
      }
    })
    .sort((a, b) => a.order - b.order)
  
  return experiences
}

// Load all projects from markdown files
export function loadProjects() {
  const projectsDirectory = path.join(contentDirectory, 'projects')
  const filenames = fs.readdirSync(projectsDirectory)
  
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const slug = name.replace(/\.md$/, '')
      const filePath = path.join(projectsDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title,
        description: data.description,
        image: data.image,
        technologies: data.technologies || [],
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        androidUrl: data.androidUrl,
        iosUrl: data.iosUrl,
        order: data.order || 999
      }
    })
    .sort((a, b) => a.order - b.order)
  
  return projects
}

// Helper function to extract responsibilities from markdown content
function extractResponsibilities(content: string): string[] {
  const lines = content.split('\n')
  const responsibilities: string[] = []
  let inResponsibilitiesSection = false
  
  for (const line of lines) {
    if (line.includes('## Key Responsibilities')) {
      inResponsibilitiesSection = true
      continue
    }
    
    if (inResponsibilitiesSection) {
      if (line.startsWith('## ')) {
        break // End of responsibilities section
      }
      
      if (line.startsWith('- ')) {
        responsibilities.push(line.substring(2).trim())
      }
    }
  }
  
  return responsibilities
}

// Helper function to create mailto link with subject and body
export function createMailtoLink(subject = "", body = "") {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  const basicInfo = loadBasicInfo()
  return `mailto:${basicInfo.email}?subject=${encodedSubject}&body=${encodedBody}`
}