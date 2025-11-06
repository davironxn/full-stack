import sgMail from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY;
const DEFAULT_TO = process.env.RECEIVER_EMAIL;
const DEFAULT_FROM = process.env.SENDER_EMAIL;

export async function sendEmail(opts: { to?: string; from?: string; subject: string; text: string; html?: string }) {
  if (!API_KEY || !DEFAULT_TO || !DEFAULT_FROM) {
    console.warn('SendGrid not configured. Skipping sendEmail.');
    return { skipped: true };
  }

  sgMail.setApiKey(API_KEY);
  const msg = {
    to: opts.to ?? DEFAULT_TO,
    from: opts.from ?? DEFAULT_FROM,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  };
  return sgMail.send(msg);
}