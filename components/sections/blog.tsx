"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExternalLink, Calendar, Clock, Search, Filter, Star } from "lucide-react";
// BlogPost interface and utility functions moved here to avoid fs module imports
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  type: 'local' | 'external';
  url?: string;
  platform?: string;
  readTime?: string;
  content?: string;
}

// Utility functions
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

interface BlogSectionProps {
  posts: BlogPost[];
  showTitle?: boolean;
  showViewAll?: boolean;
  itemsPerPage?: number;
}

export default function BlogSection({ 
  posts, 
  showTitle = true, 
  showViewAll = true, 
  itemsPerPage = 6 
}: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Get featured posts (first 2 posts or posts marked as featured)
  const featuredPosts = posts.filter(post => post.featured).slice(0, 2);
  const regularPosts = posts.filter(post => !post.featured);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  // Filter posts based on search and tag
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const displayPosts = showAll ? filteredPosts : filteredPosts.slice(0, itemsPerPage);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        {showTitle && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Latest Insights
            </div>
            <h2 className="heading-xl mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Blog & Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sharing insights on web development, career growth, and the latest tech trends. 
            From in-depth tutorials to industry observations.
          </p>
        </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h3 className="heading-md">Featured Articles</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
          </div>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full"
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Show More Button */}
        {showViewAll && filteredPosts.length > itemsPerPage && (
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
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Featured Post Card Component
function FeaturedPostCard({ post }: { post: BlogPost }) {
  const isExternal = post.type === 'external';
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
          {isExternal && (
            <Badge className={getPlatformColor(post.platform)}>
              {getPlatformIcon(post.platform)} {post.platform}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatBlogDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {isExternal ? (
          <Link href={post.url!} target="_blank" rel="noopener noreferrer">
            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Read on {post.platform}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href={`/blog/${post.slug}`}>
            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Read Article
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// Regular Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  const isExternal = post.type === 'external';
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {isExternal ? 'External' : 'Blog'}
            </span>
          </div>
          {isExternal && (
            <Badge variant="outline" className="text-xs">
              {getPlatformIcon(post.platform)} {post.platform}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatBlogDate(post.date)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {isExternal ? (
          <Link href={post.url!} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              Read on {post.platform}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href={`/blog/${post.slug}`}>
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              Read Article
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}