import { useSession } from '@src/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Props = {};

const RequireAuth = (props: Props) => {
  const session = useSession();
  const location = useLocation(); // // const loading = isFetching || isLoading;

  return session ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export { RequireAuth };
