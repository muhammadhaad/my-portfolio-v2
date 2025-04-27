import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const contentDirectory = path.join(process.cwd(), "content")

export type ContentType = "projects" | "experience" | "skills" | "education"

export interface MarkdownContent {
  slug: string
  content: string
  data: {
    title: string
    date?: string
    [key: string]: any
  }
}

export async function getContentByType(type: ContentType): Promise<MarkdownContent[]> {
  try {
    const directory = path.join(contentDirectory, type)

    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
      return [] // Return empty array if directory was just created
    }

    const filenames = fs.readdirSync(directory)
    const allContent = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const slug = filename.replace(/\.md$/, "")
        const fullPath = path.join(directory, filename)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents)

        return {
          slug,
          content,
          data: data as MarkdownContent["data"],
        }
      })
      .sort((a, b) => {
        if (a.data.order && b.data.order) {
          return a.data.order - b.data.order
        }
        if (a.data.date && b.data.date) {
          return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
        }
        return 0
      })

    return allContent
  } catch (error) {
    console.error(`Error fetching content for ${type}:`, error)
    return []
  }
}

export async function getContentBySlug(type: ContentType, slug: string): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      data: data as MarkdownContent["data"],
    }
  } catch (error) {
    console.error(`Error fetching content for ${slug}:`, error)
    return null
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
