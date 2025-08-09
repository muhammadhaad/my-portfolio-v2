"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock, ArrowRight, Eye, BookOpen, Share2 } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  external?: boolean;
  externalUrl?: string;
  platform?: string;
  readTime?: string;
  content?: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
  maxPosts?: number;
}

function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Platform icons mapping
const platformIcons: { [key: string]: any } = {
  "medium": BookOpen,
  "dev.to": Share2,
  "hashnode": BookOpen,
  "linkedin": Share2,
};

function getPlatformIcon(platform?: string) {
  if (!platform) return BookOpen;
  return platformIcons[platform.toLowerCase()] || BookOpen;
}

function getPlatformColor(platform?: string): string {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'dev.to':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'hashnode':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'linkedin':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const isExternal = post.external && post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/blog/${post.slug}`;
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;
  const PlatformIcon = getPlatformIcon(post.platform);

  const CardContent = (
    <article className="blog-card group">
      <div className="card-header-modern">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="blog-platform-icon">
              <PlatformIcon className="w-4 h-4" />
            </div>
            {post.platform && (
              <Badge className="badge-platform">
                {post.platform}
              </Badge>
            )}
          </div>
          {isExternal && (
            <div className="blog-external-indicator">
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <h3 className="card-title-modern group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <div className="blog-metadata">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time className="text-xs">{formatBlogDate(post.date)}</time>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{post.readTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span className="text-xs">Read</span>
          </div>
        </div>
      </div>
      
      <div className="card-content-modern">
        <p className="blog-description line-clamp-3">
          {post.description}
        </p>
      </div>
      
      <div className="card-footer-modern">
        <div className="space-y-4">
          <div className="card-tags-modern">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="badge-topic">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge className="badge-outline">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="blog-cta">
            <Button 
              variant="ghost" 
              size="sm" 
              className="blog-read-more group/btn"
            >
              <span>Read Article</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel} className="block">
          {CardContent}
        </a>
      );
    } else {
      return (
        <Link href={href} className="block">
          {CardContent}
        </Link>
      );
    }
  }

  return CardContent;
}

export default function BlogPreview({ posts, maxPosts = 3 }: BlogPreviewProps) {
  const displayPosts = posts.slice(0, maxPosts);

  return (
    <section className="section-padding-lg bg-gradient-to-br from-background via-background to-muted/20">
      <div className="section-container-wide">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="section-badge-dot"></span>
            Latest Insights
          </div>
          <h2 className="section-title">
            Blog & Articles
          </h2>
          <p className="section-description">
            Sharing insights on web development, career growth, and the latest tech trends.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="responsive-grid-3 mb-8 sm:mb-12">
          {displayPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="blog-view-all group">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>View All Articles</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}