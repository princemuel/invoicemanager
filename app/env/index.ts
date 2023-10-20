import { z } from 'zod';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const envVariables = z.object({
  KINDE_CLIENT_ID: z.string(),
  KINDE_CLIENT_SECRET: z.string(),
  KINDE_ISSUER_URL: z.string(),

  KINDE_SITE_URL: z.string(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string(),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string(),

  DATABASE_URL: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string(),
});

try {
  const result = envVariables.safeParse(process.env);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();

    const message = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(', ')}` : field
      )
      .join('\n ');
    throw new ReferenceError(`Missing environment variables:\n${message}`);
  }
} catch (exception) {
  if (exception instanceof ReferenceError) {
    console.error('REFERENCE_ERROR', exception);
  }
  console.error('UNKNOWN_ERROR', exception);
  process.exit(1);
}
