import { contentLoader, ContentItem, BlogContent, EducationContent, SkillsContent, ExperienceContent, ProjectContent, BasicInfoContent } from './content-loader';

// Server-side content loading functions
// These functions are safe to use in server components and API routes

// Blog functions
export async function getAllBlogPosts(): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ includeContent: false });
}

export async function getFeaturedBlogPosts(limit: number = 6): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ featured: true, limit });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogContent | null> {
  return contentLoader.getBlogPostBySlug(slug);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ tags: [tag] });
}

export async function getBlogPostsByYear(year: number): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ year });
}

export async function getBlogPostsByYearMonth(year: number, month: number): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ year, month });
}

export async function getBlogTags(): Promise<string[]> {
  return contentLoader.getBlogTags();
}

export async function getBlogArchive(): Promise<Array<{ year: number; month: number; count: number }>> {
  return contentLoader.getBlogArchive();
}

export async function getRecentBlogPosts(limit: number = 5): Promise<BlogContent[]> {
  return contentLoader.getBlogPosts({ limit });
}

export async function searchBlogPosts(query: string): Promise<BlogContent[]> {
  const results = await contentLoader.searchContent(query, ['blog']);
  return results as BlogContent[];
}

// Education functions
export async function getAllEducation(): Promise<EducationContent[]> {
  return contentLoader.getEducation({ includeContent: true, serializeMDX: true });
}

export async function getFeaturedEducation(): Promise<EducationContent[]> {
  return contentLoader.getEducation({ featured: true, includeContent: true, serializeMDX: true });
}

// Skills functions
export async function getAllSkills(): Promise<SkillsContent[]> {
  return contentLoader.getSkills({ includeContent: true, serializeMDX: true });
}

export async function getSkillsByCategory(category: string): Promise<SkillsContent[]> {
  const skills = await contentLoader.getSkills({ includeContent: true });
  return skills.filter(skill => 
    skill.skillCategories.some(cat => 
      cat.name.toLowerCase().includes(category.toLowerCase())
    )
  );
}

// Experience functions
export async function getAllExperience(): Promise<ExperienceContent[]> {
  return contentLoader.getExperience({ includeContent: true, serializeMDX: true });
}

export async function getFeaturedExperience(): Promise<ExperienceContent[]> {
  return contentLoader.getExperience({ featured: true, includeContent: true, serializeMDX: true });
}

// Projects functions
export async function getAllProjects(): Promise<ProjectContent[]> {
  return contentLoader.getProjects({ includeContent: true, serializeMDX: true });
}

export async function getFeaturedProjects(): Promise<ProjectContent[]> {
  return contentLoader.getProjects({ featured: true, includeContent: true, serializeMDX: true });
}

export async function getProjectsByStatus(status: 'completed' | 'in-progress' | 'planned'): Promise<ProjectContent[]> {
  return contentLoader.getProjects({ status, includeContent: true, serializeMDX: true });
}

// Basic info functions
export async function getBasicInfo(): Promise<BasicInfoContent | null> {
  return contentLoader.getBasicInfo();
}

// General search function
export async function searchAllContent(query: string): Promise<ContentItem[]> {
  return contentLoader.searchContent(query);
}

// Portfolio overview function
export async function getPortfolioOverview(): Promise<{
  basicInfo: BasicInfoContent | null;
  featuredEducation: EducationContent[];
  featuredExperience: ExperienceContent[];
  featuredProjects: ProjectContent[];
  featuredBlogPosts: BlogContent[];
  skills: SkillsContent[];
}> {
  const [basicInfo, featuredEducation, featuredExperience, featuredProjects, featuredBlogPosts, skills] = await Promise.all([
    getBasicInfo(),
    getFeaturedEducation(),
    getFeaturedExperience(),
    getFeaturedProjects(),
    getFeaturedBlogPosts(3),
    getAllSkills()
  ]);

  return {
    basicInfo,
    featuredEducation,
    featuredExperience,
    featuredProjects,
    featuredBlogPosts,
    skills
  };
}

// Utility functions for backward compatibility
export { formatBlogDate, getPlatformIcon, getPlatformColor } from './content-loader';

// Cache management
export function clearContentCache(): void {
  contentLoader.clearCache();
}

// Export types for use in components
export type {
  ContentItem,
  BlogContent,
  EducationContent,
  SkillsContent,
  ExperienceContent,
  ProjectContent,
  BasicInfoContent
} from './content-loader';