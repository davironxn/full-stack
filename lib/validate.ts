export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
  recaptchaToken?: unknown;
};

export function validateContact(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : 'New contact';

  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
  if (!message) errors.message = 'Message is required';
  return { valid: Object.keys(errors).length === 0, errors, data: { name, email, message, subject } };
}