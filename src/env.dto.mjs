import { z } from 'zod';

const BaseUrlSchema = z.preprocess(
  // This prevents Vercel deployments from failing
  // if you don't set the base url,
  // it automatically uses the VERCEL_URL if present.
  (value) => process.env.VERCEL_URL ?? value,
  // VERCEL_URL doesn't include `https` so it cant be validated as a URL
  process.env.VERCEL ? z.string().min(1) : z.string().url()
);

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const server = z.object({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']),

  DATABASE_URL: z.string().url(),

  KINDE_ORG_CODE: z.string().min(1),

  KINDE_ISSUER_URL: z.string().url(),
  KINDE_SITE_URL: BaseUrlSchema,
  KINDE_POST_LOGOUT_REDIRECT_URL: BaseUrlSchema,
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),

  // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
  KINDE_CLIENT_ID: z.string().min(1),
  KINDE_CLIENT_SECRET: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_VERCEL_URL: z.string().min(1).optional(),
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object
 * in the Next.js edge runtimes (e.g. middlewares) or client-side,
 * so we need to load the variables manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,
  KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
  KINDE_SITE_URL: process.env.KINDE_SITE_URL,
  KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,

  KINDE_ORG_CODE: process.env.KINDE_ORG_CODE,
  KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
  KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,

  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
};

// ------------------------------------
// ------------------------------------
// !WARNING: Don't touch the code below
// ------------------------------------
// ------------------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let envVars = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined';

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
  }

  envVars = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { envVars };
