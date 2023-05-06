import { useAuthState } from '@src/context';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Props = {};

const RequireAuth = (props: Props) => {
  const session = useAuthState();
  const location = useLocation(); // // const loading = isFetching || isLoading;

  return session.token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export { RequireAuth };
