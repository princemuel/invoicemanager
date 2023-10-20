import {
  handleAuth,
  type AuthEndpoints,
} from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: AuthEndpoints } }
) {
  // Extract the authentication endpoint from the parameters
  const endpoint = params.kindeAuth;

  // Call the handleAuth function to process authentication
  // This function likely performs authentication-related tasks
  // and may return relevant data or a response
  return handleAuth(request, endpoint);
}
