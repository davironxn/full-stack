type Entry = { count: number; firstSeen: number };

const WINDOW_MS = Number(process.env.RATE_WINDOW_MS ?? 60_000); // 1 minute
const MAX = Number(process.env.RATE_MAX ?? 10);

const store = new Map<string, Entry>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, firstSeen: now });
    return { allowed: true, remaining: MAX - 1 };
  }

  if (now - entry.firstSeen > WINDOW_MS) {
    store.set(key, { count: 1, firstSeen: now });
    return { allowed: true, remaining: MAX - 1 };
  }

  if (entry.count >= MAX) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - entry.firstSeen) };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX - entry.count };
}