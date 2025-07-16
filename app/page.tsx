import Navbar from "@/components/layout/navbar"
import Hero from "@/components/sections/hero"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Education from "@/components/sections/education"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
