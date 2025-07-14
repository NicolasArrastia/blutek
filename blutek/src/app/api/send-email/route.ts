import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { name, email, phone, message } = body;

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'axelgo.sosa@gmail.com',
      subject: 'Interesado/a en tus servicios',
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
