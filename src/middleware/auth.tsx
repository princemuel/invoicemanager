import { IErrorResponse } from '@src/@types';
import { QueryResult } from '@src/components';
import { useAuthDispatch, useAuthState } from '@src/context';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

type Props = {};

const RequireAuth = (props: Props) => {
  const [cookies] = useCookies(['jwt', 'token']);

  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const refreshAuth = useRefreshAuthQuery(
    client,
    {},
    {
      onSuccess() {
        dispatch('auth/addToken');
      },
    }
  );

  const userQuery = useGetUserQuery(
    client,
    {},
    {
      enabled: refreshAuth.isSuccess,
      onSuccess: async (data) => {
        dispatch('auth/addUser');
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          if ((error.message as string).includes('Not Authorised')) {
            try {
              refreshAuth.refetch();
              dispatch('auth/addToken');

              userQuery?.refetch();
            } catch (error) {
              navigate('/login');
            }
          }
        });
      },
    }
  );

  // const loading = isFetching || isLoading;

  return (
    <QueryResult
      loading={refreshAuth.isLoading}
      data={userQuery?.data}
      error={userQuery?.error}
      renderError={() => (
        <Navigate to='/login' state={{ from: location }} replace />
      )}
    >
      {(cookies?.token || cookies?.jwt || auth?.user) && <Outlet />}
    </QueryResult>
  );
};

export { RequireAuth };
