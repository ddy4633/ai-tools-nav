interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  key: string;
  windowMs: number;
  max: number;
}

interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

declare global {
  var __requestRateLimitStore: Map<string, RateLimitRecord> | undefined;
}

const rateLimitStore = globalThis.__requestRateLimitStore ?? new Map<string, RateLimitRecord>();

if (!globalThis.__requestRateLimitStore) {
  globalThis.__requestRateLimitStore = rateLimitStore;
}

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, '').toLowerCase();
}

function getAllowedOrigins(): string[] {
  const origins = new Set<string>();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const trustedOrigins = process.env.TRUSTED_ORIGINS?.trim();

  if (siteUrl) {
    origins.add(normalizeOrigin(siteUrl));
  }

  if (trustedOrigins) {
    trustedOrigins
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((item) => origins.add(normalizeOrigin(item)));
  }

  origins.add('http://localhost:3000');
  origins.add('http://127.0.0.1:3000');
  origins.add('http://localhost:3001');
  origins.add('http://127.0.0.1:3001');
  origins.add('http://localhost:3003');
  origins.add('http://127.0.0.1:3003');

  return [...origins];
}

function shouldEnforceOriginCheck(): boolean {
  const raw = process.env.ENFORCE_ORIGIN_CHECK?.trim().toLowerCase();

  if (raw === 'true') {
    return true;
  }

  if (raw === 'false') {
    return false;
  }

  return process.env.NODE_ENV === 'production';
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

function cleanupExpiredEntries(now: number) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function checkRateLimit(request: Request, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const ip = getClientIp(request);
  const recordKey = `${options.key}:${ip}`;
  const existing = rateLimitStore.get(recordKey);

  if (!existing || existing.resetAt <= now) {
    const fresh: RateLimitRecord = {
      count: 1,
      resetAt: now + options.windowMs,
    };

    rateLimitStore.set(recordKey, fresh);

    return {
      ok: true,
      remaining: Math.max(options.max - 1, 0),
      resetAt: fresh.resetAt,
    };
  }

  if (existing.count >= options.max) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  rateLimitStore.set(recordKey, existing);

  return {
    ok: true,
    remaining: Math.max(options.max - existing.count, 0),
    resetAt: existing.resetAt,
  };
}

export function hasValidOrigin(request: Request): boolean {
  if (!shouldEnforceOriginCheck()) {
    return true;
  }

  const origin = request.headers.get('origin')?.trim();
  const referer = request.headers.get('referer')?.trim();
  const allowed = getAllowedOrigins();

  const normalizedOrigin = origin ? normalizeOrigin(origin) : '';
  if (normalizedOrigin && allowed.includes(normalizedOrigin)) {
    return true;
  }

  if (!origin && referer) {
    try {
      const refererOrigin = normalizeOrigin(new URL(referer).origin);
      return allowed.includes(refererOrigin);
    } catch {
      return false;
    }
  }

  return false;
}

export function isNoopProviderAllowed(): boolean {
  const raw = process.env.ALLOW_NOOP_PROVIDERS?.trim().toLowerCase();

  if (raw === 'true') {
    return true;
  }

  if (raw === 'false') {
    return false;
  }

  return process.env.NODE_ENV !== 'production';
}
