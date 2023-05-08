import { IErrorResponse } from '@src/@types';
import { Loader } from '@src/components';
import * as React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../client';
import { useAuthDispatch, useAuthState } from '../context';
import { useGetUserQuery, usePersist, useRefreshAuthQuery } from '../hooks';

interface Props {}

const PersistLogin = (props: Props) => {
  const [persist] = usePersist();
  const location = useLocation();

  const auth = useAuthState();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [trueSuccess, setTrueSuccess] = React.useState(false);

  const token = auth.token;

  const refreshAuth = useRefreshAuthQuery(
    client,
    {},
    {
      enabled: !token && persist,
      retry: 1,
      onSuccess(data) {
        setTrueSuccess(true);
        dispatch('auth/addToken');
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          toast.error(error.message);

          if (
            error.message.includes('expired') ||
            error.message.includes('invalid') ||
            error.message.includes('not found')
          ) {
            dispatch('auth/logout');
            navigate('/login');
          }

          if (error.extensions.code === 'FORBIDDEN') {
            try {
              refreshAuth.refetch();
              dispatch('auth/addToken');
            } catch (error) {
              dispatch('auth/logout');
              navigate('/login');
            }
          }
        });
      },
    }
  );

  const userQuery = useGetUserQuery(
    client,
    {},
    {
      enabled: trueSuccess,
      onSuccess: async (data) => {
        dispatch('auth/addUser');
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          toast.error(error.message);

          if (
            error.message.includes('expired') ||
            error.message.includes('invalid') ||
            error.message.includes('not found')
          ) {
            dispatch('auth/logout');
            navigate('/login');
          }

          if (error.extensions.code === 'FORBIDDEN') {
            try {
              refreshAuth.refetch();
              dispatch('auth/addToken');

              userQuery?.refetch();
            } catch (error) {
              dispatch('auth/logout');
              navigate('/login');
            }
          }
        });
      },
    }
  );

  let content: JSX.Element | null = null;
  if (!persist) {
    // persist: no
    console.log('%c no persist', 'color: yellow;');
    content = <Outlet />;
  } else if (refreshAuth.status === 'loading') {
    //persist: yes, token: no
    console.log('%c loading', 'color: blue;');
    // add a loader here
    content = <Loader />;
  } else if (refreshAuth.status === 'error') {
    //persist: yes, token: no
    console.log('%c error', 'color: red;');
    content = <Navigate to='/login' state={{ from: location }} replace />;
  } else if (trueSuccess) {
    //persist: yes, token: yes
    console.log('%c success', 'color: green;');
    content = <Outlet />;
  } else if (token && refreshAuth.fetchStatus === 'idle') {
    //persist: yes, token: yes
    console.log('%c Token and Uninitialized', 'color: pink;');
    console.log(refreshAuth.fetchStatus);
    content = <Outlet />;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export { PersistLogin };
