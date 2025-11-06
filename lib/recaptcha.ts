export async function verifyRecaptcha(token?: string, ip?: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    // treat as verified in dev if not configured
    return { success: true, score: 1 };
  }
  if (!token) return { success: false };

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  if (ip) params.append('remoteip', ip);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params,
  });
  return res.json();
}