import { IErrorResponse } from '@src/@types';
import { QueryResult } from '@src/components';
import { useAuthDispatch } from '@src/context';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

type Props = {};

const RequireAuth = (props: Props) => {
  const [cookies] = useCookies(['token']);

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, data, error, refetch } = useGetUserQuery(
    client,
    {},
    {
      retry: 3,
      onSuccess: async (data) => {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: data.user,
          },
        });

        const refreshAuth = useRefreshAuthQuery.fetcher(client, {}, {});
        const response = await refreshAuth();
        dispatch({
          type: 'SET_TOKEN',
          payload: {
            token: response.refreshAuth?.token,
          },
        });
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          if ((error.message as string).includes('Not Authorised')) {
            try {
              const refreshAuth = useRefreshAuthQuery.fetcher(client, {}, {});
              const response = await refreshAuth();
              dispatch({
                type: 'SET_TOKEN',
                payload: {
                  token: response.refreshAuth?.token,
                },
              });
              refetch();
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
    <QueryResult loading={isLoading} error={error} data={data?.user}>
      {cookies?.token || data?.user ? (
        <Outlet />
      ) : (
        <Navigate to='/login' state={{ from: location }} replace />
      )}
    </QueryResult>
  );
};

export { RequireAuth };
