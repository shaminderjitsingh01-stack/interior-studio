import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, projectType, budget, message } = body

  if (!name || !email || !projectType || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Wire up your email provider here.
  // Example with Resend:
  //
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Studio <noreply@yourstudio.com>',
  //   to: process.env.CONTACT_EMAIL!,
  //   subject: `New enquiry from ${name}`,
  //   html: `
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p><strong>Project type:</strong> ${projectType}</p>
  //     <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
  //     <p><strong>Message:</strong> ${message}</p>
  //   `,
  // })

  console.log('[contact]', { name, email, projectType, budget, message })
  return NextResponse.json({ success: true })
}
