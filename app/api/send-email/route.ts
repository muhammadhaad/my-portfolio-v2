import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, message } = data

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Configure email transport
    // For production, you would use your actual SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // In production, these would come from environment variables
        user: process.env.EMAIL_USER || "muhammadhaad618@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password", // Use app password for Gmail
      },
    })

    // Email content
    const mailOptions = {
      from: email,
      to: "muhammadhaad618@gmail.com",
      subject: `Portfolio Contact: Message from ${name}`,
      text: message,
      html: `
        <div>
          <h2>New message from your portfolio website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
      replyTo: email,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
