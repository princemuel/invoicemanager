import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export function getAuthSession() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  return {
    user: getUser(),
    isAuthenticated: isAuthenticated(),
  };
}
