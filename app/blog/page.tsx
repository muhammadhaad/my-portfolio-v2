import { getAllBlogPosts } from '@/lib/server-content-loader';
import BlogPageClient from './blog-client';

export const metadata = {
  title: 'Blog - Muhammad Haad',
  description: 'Read my latest thoughts on web development, technology trends, and insights from my journey as a developer.',
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();
  return <BlogPageClient posts={allPosts} />;
}