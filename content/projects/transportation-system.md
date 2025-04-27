---
title: "On-Demand Transportation System"
description: "Developed a transportation service with applications for riders, drivers, and admins. Features included GPS tracking, fare calculation, and ratings."
image: "/placeholder.svg?height=300&width=600"
technologies: ["Flutter", "Node.js", "Google Maps API", "Firebase"]
liveUrl: "https://example.com/transportation"
githubUrl: "https://github.com/muhammadhaad/transportation-system"
order: 2
---

# On-Demand Transportation System

This comprehensive transportation solution included separate applications for riders, drivers, and administrators, creating a complete ecosystem for on-demand transportation services.

## Key Features

- Real-time GPS tracking
- Automated fare calculation
- Driver and rider ratings
- Route optimization
- Payment processing integration

The system was built with Flutter for the mobile applications, Node.js for the backend services, and integrated with Google Maps API for location services and route planning.
\`\`\`

Let's also update the script to support additional links when creating new projects:

```js file="scripts/create-content.js"
const fs = require("fs")
const path = require("path")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const contentTypes = ["projects", "experience", "skills", "education"]
const contentDir = path.join(process.cwd(), "content")

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir)
}

// Ensure subdirectories exist
contentTypes.forEach((type) => {
  const typeDir = path.join(contentDir, type)
  if (!fs.existsSync(typeDir)) {
    fs.mkdirSync(typeDir)
  }
})

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function createProject() {
  console.log("\nCreating a new project:")

  const title = await askQuestion("Title: ")
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const description = await askQuestion("Description: ")
  const image =
    (await askQuestion("Image URL (leave empty for placeholder): ")) || "/placeholder.svg?height=300&width=600"
  const technologiesStr = await askQuestion("Technologies (comma separated): ")
  const technologies = technologiesStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  const liveUrl = await askQuestion("Live URL (leave empty if none): ")
  const githubUrl = (await askQuestion("GitHub URL: ")) || "#"
  const androidUrl = await askQuestion("Android App URL (leave empty if none): ")
  const iosUrl = await askQuestion("iOS App URL (leave empty if none): ")
  const order = (await askQuestion("Order (number): ")) || "1"

  // Build frontmatter
  let frontmatter = `---
title: "${title}"
description: "${description}"
image: "${image}"
technologies: [${technologies.map((t) => `"${t}"`).join(", ")}]
`

  if (liveUrl) {
    frontmatter += `liveUrl: "${liveUrl}"\n`
  }
  
  frontmatter += `githubUrl: "${githubUrl}"\n`
  
  if (androidUrl) {
    frontmatter += `androidUrl: "${androidUrl}"\n`
  }
  
  if (iosUrl) {
    frontmatter += `iosUrl: "${iosUrl}"\n`
  }
  
  frontmatter += `order: ${order}
---

# ${title}

${description}

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

${technologies.map((t) => `- ${t}`).join("\n")}
`

  const filePath = path.join(contentDir, "projects", `${slug}.md`)
  fs.writeFileSync(filePath, frontmatter)
  console.log(`Project created at: ${filePath}`)
}

async function createExperience() {
  console.log("\nCreating a new experience:")

  const title = await askQuestion("Job Title: ")
  const company = await askQuestion("Company: ")
  const location = await askQuestion("Location: ")
  const period = await askQuestion("Period (e.g., Jan 2023 - Present): ")
  const technologiesStr = await askQuestion("Technologies (comma separated): ")
  const technologies = technologiesStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  const order = (await askQuestion("Order (number): ")) || "1"

  console.log('Enter responsibilities (one per line, type "done" when finished):')
  const responsibilities = []
  let resp = ""
  while (true) {
    resp = await askQuestion("> ")
    if (resp.toLowerCase() === "done") break
    responsibilities.push(resp)
  }

  const slug = `${company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

  const content = `---
title: "${title}"
company: "${company}"
location: "${location}"
period: "${period}"
technologies: [${technologies.map((t) => `"${t}"`).join(", ")}]
order: ${order}
---

${responsibilities.map((r) => `- ${r}`).join("\n")}
`

  const filePath = path.join(contentDir, "experience", `${slug}.md`)
  fs.writeFileSync(filePath, content)
  console.log(`Experience created at: ${filePath}`)
}

async function main() {
  console.log("Content Creation Tool")
  console.log("====================")

  while (true) {
    console.log("\nWhat would you like to create?")
    console.log("1. Project")
    console.log("2. Experience")
    console.log("3. Exit")

    const choice = await askQuestion("Enter your choice (1-3): ")

    if (choice === "1") {
      await createProject()
    } else if (choice === "2") {
      await createExperience()
    } else if (choice === "3") {
      break
    } else {
      console.log("Invalid choice. Please try again.")
    }
  }

  rl.close()
}

main().catch(console.error)
