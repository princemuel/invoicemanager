import { z } from 'zod';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const envVariables = z.object({
  MONGODB_URI: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

export const environment = envVariables.parse(process.env);
