import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Education from "@/components/sections/education"
import BlogPreview from "@/components/sections/blog-preview"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"
import { getFeaturedBlogPosts } from "@/lib/server-content-loader"

export default async function Home() {
  // Load featured blog posts for the homepage
  const featuredPosts = await getFeaturedBlogPosts(6);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Full width */}
      <Hero />
      
      {/* Main Content Sections */}
      <div className="space-y-0">
        {/* Experience Section */}
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        
        {/* Blog Section */}
        <section id="blog" className="scroll-mt-20">
          <BlogPreview posts={featuredPosts} maxPosts={3} />
        </section>
        
        {/* Education Section */}
        <section id="education" className="scroll-mt-20">
          <Education />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
