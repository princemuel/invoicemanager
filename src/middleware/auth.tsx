import { IUser } from '@src/@types';
import { QueryResult } from '@src/components';
import { useAuthDispatch } from '@src/context';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {};

const RequireAuth = (props: Props) => {
  const [cookies] = useCookies(['token']);

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isFetching, data, error, refetch } = useGetUserQuery(
    client,
    {},
    {
      // retry: 1,
      onSuccess: async (data) => {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: data.user as IUser,
          },
        });

        const fetcher = useRefreshAuthQuery.fetcher(client, {}, {});
        const fetched = await fetcher();
        dispatch({
          type: 'SET_TOKEN',
          payload: {
            token: fetched.refreshAuth?.accessToken as string,
          },
        });
      },
      onError(error: any) {
        error.response.errors.forEach(async (err: any) => {
          toast.error(err.message);
          if ((err.message as string).includes('Not Authorised')) {
            try {
              const fetcher = useRefreshAuthQuery.fetcher(client, {});
              const data = await fetcher();
              dispatch({
                type: 'SET_TOKEN',
                payload: {
                  token: data.refreshAuth?.accessToken as string,
                },
              });
              refetch();
            } catch (error) {
              console.log(error);
              navigate('/login');
            }
          }
        });
      },
    }
  );

  const loading = isFetching || isLoading;

  return (
    <QueryResult loading={loading} error={error} data={data?.user}>
      {cookies.token || data?.user ? (
        <Outlet />
      ) : (
        <Navigate to='/login' state={{ from: location }} replace />
      )}
    </QueryResult>
  );
};

export { RequireAuth };
