import { type KindeUser } from '@kinde-oss/kinde-auth-nextjs/server';
import db from '../database';

export async function createAuthUser(client: KindeUser): Promise<AuthUser> {
  let user = await db.user.findUnique({
    where: {
      email: client?.email?.toLowerCase(),
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        kindeId: client.id || '',
        email: client.email?.toLowerCase(),
        firstName: client?.given_name,
        lastName: client?.family_name,
        image: client?.picture,
      },
    });
  }

  return {
    ...user,
    createdAt: user?.createdAt.toISOString(),
    updatedAt: user?.updatedAt.toISOString(),
  } satisfies AuthUser;
}
