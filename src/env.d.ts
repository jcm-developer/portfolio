/// <reference types="astro/client" />

/** Cloudflare rate limiting binding, as declared under `ratelimits` in `wrangler.jsonc`. */
interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** Bindings and secrets the Worker receives at runtime. */
interface Env {
  /** OpenAI key. A Worker secret in production, `.dev.vars` locally. */
  OPENAI_API_KEY?: string;
  /** Optional model override; defaults to `DEFAULT_MODEL` in `src/pages/api/chat.ts`. */
  OPENAI_MODEL?: string;
  /** Optional chat completions URL, to route through a gateway or a local mock. */
  OPENAI_CHAT_URL?: string;
  CHAT_LIMITER?: RateLimiter;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
