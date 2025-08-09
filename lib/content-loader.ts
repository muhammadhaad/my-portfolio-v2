import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Base interfaces
export interface BaseContent {
  id: string;
  type: string;
  title: string;
  slug: string;
  content: string;
  serializedContent?: MDXRemoteSerializeResult;
  lastModified: Date;
}

// Specific content type interfaces
export interface EducationContent extends BaseContent {
  type: 'degree' | 'certification' | 'course';
  institution: string;
  location?: string;
  period: string;
  status: 'completed' | 'in-progress' | 'planned';
  order: number;
  featured: boolean;
  coursework?: string[];
  languages?: Array<{
    name: string;
    level: string;
  }>;
}

export interface SkillsContent extends BaseContent {
  type: 'skills';
  description: string;
  lastUpdated: string;
  featured: boolean;
  skillCategories: Array<{
    name: string;
    icon: string;
    skills: Array<{
      name: string;
      level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
      experience: string;
      description: string;
    }>;
  }>;
}

export interface ExperienceContent extends BaseContent {
  type: 'work' | 'freelance' | 'internship' | 'volunteer';
  company: string;
  location: string;
  period: string;
  technologies: string[];
  order: number;
  featured: boolean;
}

export interface ProjectContent extends BaseContent {
  type: 'web' | 'mobile' | 'automation' | 'other';
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  links?: Array<{
    type: 'github' | 'demo' | 'website' | 'other';
    url: string;
    label: string;
  }>;
  images?: string[];
}

export interface BlogContent extends BaseContent {
  type: 'local' | 'external';
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  author: string;
  url?: string; // For external posts
  platform?: string; // For external posts
  year?: number;
  month?: number;
}

export interface BasicInfoContent extends BaseContent {
  type: 'basic-info';
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  social?: Array<{
    platform: string;
    url: string;
    username: string;
  }>;
}

// Union type for all content
export type ContentItem = 
  | EducationContent 
  | SkillsContent 
  | ExperienceContent 
  | ProjectContent 
  | BlogContent 
  | BasicInfoContent;

// Content loader class
export class ContentLoader {
  private contentDir: string;
  private cache: Map<string, ContentItem[]> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(contentDir: string = 'content') {
    this.contentDir = path.join(process.cwd(), contentDir);
  }

  // Generic content loader
  async loadContent<T extends ContentItem>(
    contentType: string,
    options: {
      includeContent?: boolean;
      serializeMDX?: boolean;
      sortBy?: keyof T;
      sortOrder?: 'asc' | 'desc';
      filter?: (item: T) => boolean;
      limit?: number;
    } = {}
  ): Promise<T[]> {
    const cacheKey = `${contentType}-${JSON.stringify(options)}`;
    
    // Check cache
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey) as T[];
    }

    const contentPath = path.join(this.contentDir, contentType);
    
    if (!fs.existsSync(contentPath)) {
      console.warn(`Content directory not found: ${contentPath}`);
      return [];
    }

    const items = await this.loadContentFromDirectory<T>(
      contentPath,
      contentType,
      options
    );

    // Apply filtering
    let filteredItems = options.filter ? items.filter(options.filter) : items;

    // Apply sorting
    if (options.sortBy) {
      filteredItems.sort((a, b) => {
        const aVal = a[options.sortBy!];
        const bVal = b[options.sortBy!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return options.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    // Apply limit
    if (options.limit) {
      filteredItems = filteredItems.slice(0, options.limit);
    }

    // Cache results
    this.cache.set(cacheKey, filteredItems);
    this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);

    return filteredItems;
  }

  // Load content from directory (recursive for blog structure)
  private async loadContentFromDirectory<T extends ContentItem>(
    dirPath: string,
    contentType: string,
    options: any
  ): Promise<T[]> {
    const items: T[] = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursive loading for nested directories (like blog/year/month)
        const nestedItems = await this.loadContentFromDirectory<T>(
          fullPath,
          contentType,
          options
        );
        items.push(...nestedItems);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        try {
          const item = await this.loadSingleContent<T>(
            fullPath,
            contentType,
            options
          );
          if (item) {
            items.push(item);
          }
        } catch (error) {
          console.error(`Error loading content from ${fullPath}:`, error);
        }
      }
    }

    return items;
  }

  // Load single content file
  private async loadSingleContent<T extends ContentItem>(
    filePath: string,
    contentType: string,
    options: any
  ): Promise<T | null> {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    const stats = fs.statSync(filePath);

    // Generate slug from filename
    const filename = path.basename(filePath, path.extname(filePath));
    const slug = filename.toLowerCase().replace(/\s+/g, '-');

    // Extract year/month from path for blog posts
    let year: number | undefined;
    let month: number | undefined;
    if (contentType === 'blog') {
      const pathParts = filePath.split(path.sep);
      const yearIndex = pathParts.findIndex(part => /^\d{4}$/.test(part));
      if (yearIndex !== -1) {
        year = parseInt(pathParts[yearIndex]);
        if (yearIndex + 1 < pathParts.length && /^\d{2}$/.test(pathParts[yearIndex + 1])) {
          month = parseInt(pathParts[yearIndex + 1]);
        }
      }
    }

    // Base content object
    const baseContent: BaseContent = {
      id: `${contentType}-${slug}`,
      type: frontmatter.type || contentType,
      title: frontmatter.title || filename,
      slug,
      content: options.includeContent !== false ? content : '',
      lastModified: stats.mtime,
    };

    // Serialize MDX if requested
    if (options.serializeMDX && content) {
      try {
        baseContent.serializedContent = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        });
      } catch (error) {
        console.error(`Error serializing MDX for ${filePath}:`, error);
      }
    }

    // Merge with frontmatter and add type-specific properties
    const item = {
      ...baseContent,
      ...frontmatter,
      ...(year && { year }),
      ...(month && { month }),
    } as T;

    return item;
  }

  // Specific content type loaders
  async getEducation(options?: {
    includeContent?: boolean;
    serializeMDX?: boolean;
    featured?: boolean;
  }): Promise<EducationContent[]> {
    return this.loadContent<EducationContent>('education', {
      ...options,
      sortBy: 'order' as keyof EducationContent,
      sortOrder: 'asc',
      filter: options?.featured ? (item) => item.featured : undefined,
    });
  }

  async getSkills(options?: {
    includeContent?: boolean;
    serializeMDX?: boolean;
  }): Promise<SkillsContent[]> {
    return this.loadContent<SkillsContent>('skills', options);
  }

  async getExperience(options?: {
    includeContent?: boolean;
    serializeMDX?: boolean;
    featured?: boolean;
  }): Promise<ExperienceContent[]> {
    return this.loadContent<ExperienceContent>('experience', {
      ...options,
      sortBy: 'order' as keyof ExperienceContent,
      sortOrder: 'asc',
      filter: options?.featured ? (item) => item.featured : undefined,
    });
  }

  async getProjects(options?: {
    includeContent?: boolean;
    serializeMDX?: boolean;
    featured?: boolean;
    status?: 'completed' | 'in-progress' | 'planned';
  }): Promise<ProjectContent[]> {
    return this.loadContent<ProjectContent>('projects', {
      ...options,
      filter: (item) => {
        if (options?.featured && !item.featured) return false;
        if (options?.status && item.status !== options.status) return false;
        return true;
      },
    });
  }

  async getBlogPosts(options?: {
    includeContent?: boolean;
    serializeMDX?: boolean;
    featured?: boolean;
    year?: number;
    month?: number;
    tags?: string[];
    limit?: number;
  }): Promise<BlogContent[]> {
    return this.loadContent<BlogContent>('blog', {
      ...options,
      sortBy: 'date' as keyof BlogContent,
      sortOrder: 'desc',
      filter: (item) => {
        if (options?.featured && !item.featured) return false;
        if (options?.year && item.year !== options.year) return false;
        if (options?.month && item.month !== options.month) return false;
        if (options?.tags && !options.tags.some(tag => item.tags.includes(tag))) return false;
        return true;
      },
    });
  }

  async getBasicInfo(): Promise<BasicInfoContent | null> {
    const items = await this.loadContent<BasicInfoContent>('', {
      includeContent: true,
      serializeMDX: true,
    });
    return items.find(item => item.type === 'basic-info') || null;
  }

  // Utility methods
  async getBlogPostBySlug(slug: string): Promise<BlogContent | null> {
    const posts = await this.getBlogPosts({ includeContent: true, serializeMDX: true });
    return posts.find(post => post.slug === slug) || null;
  }

  async getBlogTags(): Promise<string[]> {
    const posts = await this.getBlogPosts();
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }

  async getBlogArchive(): Promise<Array<{ year: number; month: number; count: number }>> {
    const posts = await this.getBlogPosts();
    const archive = new Map<string, number>();
    
    posts.forEach(post => {
      if (post.year && post.month) {
        const key = `${post.year}-${post.month}`;
        archive.set(key, (archive.get(key) || 0) + 1);
      }
    });

    return Array.from(archive.entries())
      .map(([key, count]) => {
        const [year, month] = key.split('-').map(Number);
        return { year, month, count };
      })
      .sort((a, b) => b.year - a.year || b.month - a.month);
  }

  // Cache management
  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  // Search functionality
  async searchContent(query: string, contentTypes?: string[]): Promise<ContentItem[]> {
    const results: ContentItem[] = [];
    const searchTypes = contentTypes || ['education', 'skills', 'experience', 'projects', 'blog'];

    for (const type of searchTypes) {
      const items = await this.loadContent(type, { includeContent: true });
      const filtered = items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      results.push(...filtered);
    }

    return results;
  }
}

// Export singleton instance
export const contentLoader = new ContentLoader();

// Export utility functions for backward compatibility
export async function getAllBlogPosts(): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ includeContent: false });
}

export async function getFeaturedBlogPosts(): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ featured: true, limit: 6 });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogContent | null> {
  return contentLoader.getBlogPostBySlug(slug);
}

export async function getBlogTags(): Promise<string[]> {
  return contentLoader.getBlogTags();
}

export async function getBlogCategories(): Promise<any[]> {
  // Load from blog-config.json for backward compatibility
  try {
    const configPath = path.join(process.cwd(), 'content', 'blog', 'blog-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.categories || [];
    }
  } catch (error) {
    console.error('Error loading blog categories:', error);
  }
  return [];
}

// Utility functions
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    'medium': '📝',
    'dev.to': '💻',
    'hashnode': '📰',
    'local': '🏠',
    'external': '🔗'
  };
  return icons[platform.toLowerCase()] || '📄';
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    'medium': 'bg-green-100 text-green-800',
    'dev.to': 'bg-blue-100 text-blue-800',
    'hashnode': 'bg-purple-100 text-purple-800',
    'local': 'bg-gray-100 text-gray-800',
    'external': 'bg-orange-100 text-orange-800'
  };
  return colors[platform.toLowerCase()] || 'bg-gray-100 text-gray-800';
}