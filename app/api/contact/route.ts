import { NextResponse } from 'next/server';
import { validateContact } from '../../../lib/validate';
import { sendEmail } from '../../../lib/sendgrid';
import { verifyRecaptcha } from '../../../lib/recaptcha';
import { checkRateLimit } from '../../../lib/rateLimiter';
import { prisma } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { valid, errors, data } = validateContact(payload);

    if (!valid) return NextResponse.json({ errors }, { status: 400 });

    // Rate limit by IP or name+email fallback
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rateKey = ip !== 'unknown' ? `ip:${ip}` : `contact:${data.email}:${data.name}`;
    const rl = checkRateLimit(rateKey);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)) } }
      );
    }

    // reCAPTCHA
    const recaptchaToken = (payload as any).recaptchaToken;
    const recaptcha = await verifyRecaptcha(recaptchaToken, ip);
    if (!recaptcha?.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // persist contact
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject ?? null,
        message: data.message,
        ip,
      },
    });

    // send email (no-op if not configured)
    await sendEmail({
      subject: data.subject ?? `Contact from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p>${data.message}</p>`,
      from: process.env.SENDER_EMAIL ?? undefined,
      to: process.env.RECEIVER_EMAIL ?? undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact error', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}