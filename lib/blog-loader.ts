import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const blogDirectory = path.join(process.cwd(), 'content/blog');
const configPath = path.join(blogDirectory, 'blog-config.json');

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'local' | 'external';
  slug?: string;
  url?: string;
  platform?: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  author?: string;
  content?: any; // MDX content for local posts
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

export interface BlogConfig {
  posts: BlogPost[];
  categories: BlogCategory[];
}

// Load blog configuration
export function loadBlogConfig(): BlogConfig {
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configContent);
  } catch (error) {
    console.error('Error loading blog config:', error);
    return { posts: [], categories: [] };
  }
}

// Get all blog posts (both local and external)
export function getAllBlogPosts(): BlogPost[] {
  const config = loadBlogConfig();
  return config.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured);
}

// Get blog posts by tag
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Get blog post by slug (for local posts)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const config = loadBlogConfig();
    const post = config.posts.find(p => p.slug === slug && p.type === 'local');
    
    if (!post) {
      return null;
    }

    const filePath = path.join(blogDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: 'github-dark',
                light: 'github-light'
              },
              keepBackground: false
            }
          ]
        ]
      }
    });

    return {
      ...post,
      ...data,
      content: mdxSource
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Get all available tags
export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

// Get blog categories
export function getBlogCategories(): BlogCategory[] {
  const config = loadBlogConfig();
  return config.categories;
}

// Search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getAllBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Get recent blog posts
export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

// Get related posts based on tags
export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts().filter(post => post.id !== currentPost.id);
  
  // Score posts based on shared tags
  const scoredPosts = allPosts.map(post => {
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    return {
      post,
      score: sharedTags.length
    };
  });
  
  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// Utility function to format date
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Utility function to get platform icon
export function getPlatformIcon(platform?: string): string {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return '📝';
    case 'linkedin':
      return '💼';
    case 'dev.to':
      return '👨‍💻';
    case 'hashnode':
      return '📰';
    default:
      return '📄';
  }
}

// Utility function to get platform color
export function getPlatformColor(platform?: string): string {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'linkedin':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'dev.to':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'hashnode':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}