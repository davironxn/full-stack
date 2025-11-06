export function requireApiKey(request: Request) {
  const apiKey = process.env.ADMIN_API_KEY;
  if (!apiKey) {
    const e: any = new Error('Admin API key not configured');
    e.status = 500;
    throw e;
  }

  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  const keyHeader = request.headers.get('x-api-key');

  if (token !== apiKey && keyHeader !== apiKey) {
    const e: any = new Error('Unauthorized');
    e.status = 401;
    throw e;
  }
}