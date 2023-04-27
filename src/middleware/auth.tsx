import { IErrorResponse } from '@src/@types';
import { QueryResult } from '@src/components';
import { useAuthDispatch } from '@src/context';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

type Props = {};

const RequireAuth = (props: Props) => {
  const [cookies] = useCookies(['jwt']);

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

  const { isLoading, data, error, refetch } = useGetUserQuery(
    client,
    {},
    {
      enabled: refreshAuth.isSuccess,
      retry: 1,
      onSuccess: async (data) => {
        dispatch('auth/addUser');
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          if ((error.message as string).includes('Not Authorised')) {
            try {
              refreshAuth.refetch();
              dispatch('auth/addToken');

              refetch();
            } catch (error) {
              console.log('REQUIRE_AUTH_ERROR', error);

              navigate('/login');
            }
          }
        });
      },
    }
  );

  // const loading = isFetching || isLoading;

  return (
    <QueryResult loading={isLoading} error={error} data={data?.user}>
      {cookies?.jwt || data?.user ? (
        <Outlet />
      ) : (
        <Navigate to='/login' state={{ from: location }} replace />
      )}
    </QueryResult>
  );
};

export { RequireAuth };
