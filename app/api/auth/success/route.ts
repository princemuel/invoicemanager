import { createAuthUser } from '@/app/actions/create-user';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { getUser } = getKindeServerSession();

  const client = getUser();

  if (!client || client == null || !client?.id)
    throw new Error(`Something went wrong with authentication '${client}'`);

  await createAuthUser(client);
  return NextResponse.redirect(new URL('/', request.url));
}
