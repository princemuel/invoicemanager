import { singleton } from '@/helpers';
import { PrismaClient } from '@prisma/client';

declare global {
  // PrismaClient is attached to the `global` object in development to prevent
  // exhausting your database connection limit.
  //
  // Learn more:
  // https://pris.ly/d/help/next-js-best-practices
  var prisma: PrismaClient | undefined;
}

export default singleton('prisma', init);

// export default db;

function init(): PrismaClient {
  const isProd = process.env.NODE_ENV === 'production';
  return new PrismaClient({
    errorFormat: isProd ? 'minimal' : 'pretty',
    log: isProd ? ['error'] : ['query', 'error', 'warn'],
  });
}
// const db =
//   globalThis?.prisma ||
//   new PrismaClient({
//     errorFormat: isProd ? 'minimal' : 'pretty',
//     log: isProd ? ['error'] : ['query', 'error', 'warn'],
//   });

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
