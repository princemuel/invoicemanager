import {
  handleAuth,
  type AuthEndpoints,
} from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: AuthEndpoints } }
) {
  return handleAuth(request, params.kindeAuth);
}
