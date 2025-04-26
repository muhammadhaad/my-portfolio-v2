import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CVDownload from "@/components/cv-download"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Hero />
        <CVDownload />
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
