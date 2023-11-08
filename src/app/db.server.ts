import { singleton } from '@/helpers';
import { PrismaClient } from '@prisma/client';

export default singleton('prisma', () => {
  const production = process.env.NODE_ENV === 'production';

  return new PrismaClient({
    errorFormat: production ? 'minimal' : 'pretty',
    log: production ? ['error'] : ['query', 'error', 'warn'],
  }) as PrismaClient;
});
