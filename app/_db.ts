import { PrismaClient } from '@prisma/client';

declare global {
  // PrismaClient is attached to the `global` object in development to prevent
  // exhausting your database connection limit.
  //
  // Learn more:
  // https://pris.ly/d/help/next-js-best-practices
  var prisma: PrismaClient | undefined;
}

const isProd = process.env.NODE_ENV === 'production';

const db =
  globalThis?.prisma ||
  new PrismaClient({
    errorFormat: isProd ? 'minimal' : 'pretty',
    log: isProd ? ['error'] : ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;