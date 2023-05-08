import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useAuthState } from '../context';

interface TokenPayload extends JwtPayload {
  email: string;
  photo: string | null;
  sub: string;
}

const useSession = () => {
  const [cookies] = useCookies(['jwt']);
  const token = (useAuthState().token || cookies.jwt) as string | undefined;

  if (!token) return null;
  const decoded = jwtDecode<TokenPayload>(token);
  const { email, photo, sub: id } = decoded;

  return { email, photo, id };
};

export { useSession };
