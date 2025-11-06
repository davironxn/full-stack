import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/contact/route';

// mock recaptcha and sendgrid
vi.mock('../lib/recaptcha', () => ({
  verifyRecaptcha: async () => ({ success: true }),
}));
vi.mock('../lib/sendgrid', () => ({
  sendEmail: async () => ({ skipped: true }),
}));
vi.mock('../lib/db', () => {
  const create = async () => ({ id: 1 });
  return { prisma: { contact: { create } } };
});

describe('POST /api/contact', () => {
  it('validates and returns success', async () => {
    const body = JSON.stringify({ name: 'Alice', email: 'alice@example.com', message: 'Hi', recaptchaToken: 'token' });
    const res = await POST(new Request('http://localhost/api/contact', { method: 'POST', body, headers: { 'content-type': 'application/json' } }));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toHaveProperty('success', true);
  });

  it('rejects invalid payload', async () => {
    const body = JSON.stringify({ name: '', email: 'bad', message: '' });
    const res = await POST(new Request('http://localhost/api/contact', { method: 'POST', body, headers: { 'content-type': 'application/json' } }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('errors');
  });
});