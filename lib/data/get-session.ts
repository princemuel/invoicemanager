import { getServerSession } from 'next-auth';
import authOptions from '../api/auth-options';

export async function getSession() {
  return await getServerSession(authOptions);
}
