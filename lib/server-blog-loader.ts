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

// Get all blog posts
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

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = getAllBlogPosts();
  const post = allPosts.find(p => p.slug === slug);
  
  if (!post) {
    return null;
  }
  
  // If it's an external post, return as is
  if (post.type === 'external') {
    return post;
  }
  
  // For local posts, load and process the MDX content
  try {
    const filePath = path.join(blogDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`MDX file not found: ${filePath}`);
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, {
            theme: 'github-dark',
            keepBackground: false,
          }],
        ],
      },
    });
    
    return {
      ...post,
      content: mdxSource,
      // Override with frontmatter if available
      title: frontmatter.title || post.title,
      description: frontmatter.description || post.description,
      date: frontmatter.date || post.date,
      tags: frontmatter.tags || post.tags,
      author: frontmatter.author || post.author,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Get all unique tags
export function getAllBlogTags(): string[] {
  const allPosts = getAllBlogPosts();
  const tags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Get blog categories
export function getBlogCategories(): BlogCategory[] {
  const config = loadBlogConfig();
  return config.categories;
}

// Search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Get recent blog posts
export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

// Get related blog posts based on tags
export function getRelatedBlogPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return {
        post,
        relevanceScore: commonTags.length
      };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
    .map(item => item.post);
  
  return relatedPosts;
}

// Format blog date
export function formatBlogDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

// Get platform icon
export function getPlatformIcon(platform?: string): string {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return '📝';
    case 'dev.to':
      return '👨‍💻';
    case 'hashnode':
      return '🔗';
    case 'linkedin':
      return '💼';
    case 'personal':
    default:
      return '📄';
  }
}

// Get platform color
export function getPlatformColor(platform?: string): string {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'dev.to':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'hashnode':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'linkedin':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'personal':
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}