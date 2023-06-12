import db from '@/lib/prisma';
import { getSession } from './get-session';

export async function getUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) return null;

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
