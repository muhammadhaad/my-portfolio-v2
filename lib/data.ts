// Centralized data store for the portfolio website
export const siteConfig = {
  name: "Muhammad Haad Bin Zahid",
  title: "Software Developer",
  description:
    "Versatile Full Stack Developer and Automation Engineer with 4+ years of web, mobile, and workflow automation expertise. Specialized in Next.js, NestJS, Flutter, and automation platforms like n8n and Zapier. Proven record of delivering secure, high-performance applications and streamlining business processes through advanced automation.",
  email: "m.haad997@live.com",
  phone: "+92(316) 589-0766",
  location: "Rawalpindi, Pakistan",
  cvUrl: "https://drive.google.com/file/d/1HxUQ2foVeTIfosFn2tM16FW46yD_6vih/view",
  cvDownloadUrl: "https://drive.google.com/uc?export=download&id=1HxUQ2foVeTIfosFn2tM16FW46yD_6vih",
  profileImage: "/images/profile.png",
  social: {
    github: "https://github.com/muhammadhaad",
    linkedin: "https://linkedin.com/in/muhammadhaad",
  },
}

// Helper function to create mailto link with subject and body
export function createMailtoLink(subject = "", body = "") {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `mailto:${siteConfig.email}?subject=${encodedSubject}&body=${encodedBody}`
}
