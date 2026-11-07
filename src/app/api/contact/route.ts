import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const gmailUser = process.env.EMAIL_USER;
    const gmailPass = process.env.EMAIL_PASS;
    const recipientEmail = process.env.EMAIL_TO || gmailUser;

    if (!gmailUser || !gmailPass || !recipientEmail) {
      console.error('Missing email service configuration. Set EMAIL_USER, EMAIL_PASS, and EMAIL_TO.');
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

    const emailSubject = (subject || 'New message from portfolio contact form').replace(/[\r\n]+/g, ' ');
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(emailSubject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    await transporter.sendMail({
      from: `Portfolio contact <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: `Nama: ${name}\nEmail: ${email}\nSubjek: ${emailSubject}\n\nPesan:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h3 style="margin-bottom: 12px;">Pesan Baru dari Portfolio</h3>
          <p><strong>Nama:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subjek:</strong> ${safeSubject}</p>
          <div style="margin-top: 16px; padding: 12px 16px; background: #f3f4f6; border-radius: 8px;">
            ${safeMessage}
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
