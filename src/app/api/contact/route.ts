import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.EMAIL_USER || 'mfalfi02@gmail.com';
    const gmailPass = process.env.EMAIL_PASS || 'nqkn bdlz djcu srmr';
    const recipientEmail = process.env.EMAIL_TO || 'mfalfi02@gmail.com';

    if (!gmailUser || !gmailPass) {
      console.error('Missing Gmail SMTP configuration. Set EMAIL_USER and EMAIL_PASS.');
      return NextResponse.json(
        {
          error:
            'Email sender is not configured yet. Add EMAIL_USER and EMAIL_PASS to your .env.local file.',
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const emailSubject = (subject && String(subject).trim()) || 'New message from portfolio contact form';

    await transporter.sendMail({
      from: `"${String(name).trim()}" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: `Nama: ${name}\nEmail: ${email}\nSubjek: ${emailSubject}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h3 style="margin-bottom: 12px;">Pesan Baru dari Portfolio</h3>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subjek:</strong> ${emailSubject}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f3f4f6; border-radius: 8px;">
            ${message.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while sending the email.' },
      { status: 500 }
    );
  }
}
