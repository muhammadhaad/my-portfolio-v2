import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border mt-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {currentYear} Muhammad Haad Bin Zahid. All rights reserved.
        </div>

        <div className="flex gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Experience
          </Link>
          <Link href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
