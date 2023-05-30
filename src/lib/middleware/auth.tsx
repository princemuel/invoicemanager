import { Loader } from '@src/components';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../client';
import { useAuthDispatch, useAuthState } from '../context';
import { useRefreshQuery } from '../hooks';
import { AuthError } from './error';

const messages = [
  'email was not found',
  'token is invalid',
  'token has expired',
  'Internal Server Error',
];

interface Props {}

const AuthMiddleware = (props: Props) => {
  const auth = useAuthState();
  const dispatch = useAuthDispatch();

  const [isTrueError, setIsTrueError] = React.useState(false);

  const token = auth?.token;

  const { isLoading, error } = useRefreshQuery(client, undefined, {
    enabled: !token && !isTrueError,
    retry: !isTrueError,
    onSuccess(data) {
      dispatch('auth/addToken');
    },
    onError(err: IErrorResponse) {
      err?.response?.errors?.forEach((error) => {
        toast.error(error?.message);
      });

      const isRefreshError = messages.some((message) =>
        err?.response?.errors?.[0].message.includes(message)
      );

      if (isRefreshError) {
        setIsTrueError(true);
        dispatch('auth/logout');
      }
    },
  });

  // after logout, clear all tokens, block all routes and take user to login
  // persist and token ? outlet ...
  // on browser window reopen, if token is not yet expired, refresh token

  // !persist and token ? outlet
  // on browser window reopen, tho' token is not yet expired, take user to login

  let content = <></>;
  if (isLoading) {
    content = <Loader />;
  } else if (isTrueError) {
    content = <AuthError message={error?.response?.errors[0]?.message} />;
  } else {
    content = <Outlet />;
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export { AuthMiddleware };
