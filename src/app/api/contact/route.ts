import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      name: string
      email: string
      message: string
      apiKey?: string
      recipientEmail?: string
    }
    const { name, email, message, apiKey, recipientEmail } = body

    // Get the Resend API key from settings (passed in request) or environment
    const resendApiKey = apiKey || process.env.RESEND_API_KEY

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      )
    }

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Recipient email not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // You can customize this after verifying your domain
      to: recipientEmail, // Email from Contact global settings
      replyTo: email,
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
