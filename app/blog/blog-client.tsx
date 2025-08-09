"use client";

import { useState } from "react";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExternalLink, Calendar, Clock, Search, Filter } from "lucide-react";
import Link from "next/link";

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

function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getPlatformIcon(platform?: string) {
  switch (platform?.toLowerCase()) {
    case 'medium':
      return '📝';
    case 'dev.to':
      return '💻';
    case 'hashnode':
      return '🔗';
    case 'linkedin':
      return '💼';
    default:
      return '📄';
  }
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatBlogDate(post.date)}</span>
            {post.readTime && (
              <>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          {isExternal && (
            <Badge variant="secondary" className={`text-xs ${getPlatformColor(post.platform)}`}>
              {getPlatformIcon(post.platform)} {post.platform || 'External'}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-base mb-4 line-clamp-3">
          {post.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          <Link href={href} target={target} rel={rel}>
            <Button variant="ghost" size="sm" className="group/btn">
              Read More
              {isExternal ? (
                <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              ) : (
                <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
              )}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BlogPageClient({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 12;

  // Get all unique tags
  const allTags = Array.from(new Set(initialPosts.flatMap(post => post.tags))).sort();

  // Filter posts based on search and tag (no featured/regular separation)
  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const displayPosts = showAll ? filteredPosts : filteredPosts.slice(0, itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              All Articles
            </div>
            <h1 className="heading-xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Blog & Articles
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my thoughts on web development, technology trends, and insights from my journey as a developer.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            
            {/* Filter Header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by:</span>
              </div>
            </div>
            
            {/* Tag Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="rounded-full"
              >
                All ({initialPosts.length})
              </Button>
              {allTags.map((tag) => {
                const count = initialPosts.filter(post => post.tags.includes(tag)).length;
                return (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className="rounded-full"
                  >
                    {tag} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {filteredPosts.length === initialPosts.length 
                ? `Showing all ${filteredPosts.length} articles`
                : `Found ${filteredPosts.length} articles`
              }
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Show More Button */}
          {filteredPosts.length > itemsPerPage && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                {showAll ? "Show Less" : `Show All ${filteredPosts.length} Articles`}
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="heading-md mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}