import db from '@/app/_data/db.server';
import { getAuthSession } from '@/app/_data/lib';
import { handleServerError } from '@/helpers';
import { HttpError } from 'http-errors-enhanced';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { authenticated, user: client } = getAuthSession();

  try {
    if (client == null || !client?.id)
      throw new HttpError(401, 'something went wrong with authentication');

    const dbUser = await db.user.findUnique({
      where: {
        kindeId: client.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          kindeId: client.id,
          email: client.email?.toLowerCase(),
          firstName: client.given_name,
          lastName: client.family_name,
          image: client.picture,
        },
      });
    }
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    return handleServerError(error);
  }
}
