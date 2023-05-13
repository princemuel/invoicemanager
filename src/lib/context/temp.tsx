import type { Project } from '@src/@types';
import { GraphQLClient } from 'graphql-request';
import { produce } from 'immer';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useImmerReducer } from 'use-immer';
import { client } from '../client';
import { useGetUserQuery, usePersist, useRefreshAuthQuery } from '../hooks';

interface IState {
  token?: string;
  user?: Partial<Project.IUser>;
}

type IAction = 'auth/addUser' | 'auth/addToken' | 'auth/logout';

const initialState: IState = {
  token: undefined,
  user: undefined,
};

const messages = [
  'email was not found',
  'token is invalid',
  'token has expired',
  'Internal Server Error',
];

const AuthStore = createContext<IState | undefined>(undefined);
const AuthStoreDispatch = createContext<Dispatch<IAction> | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  // let [state, dispatch] = useAuth(client);

  const [isTrueSuccess, setIsTrueSuccess] = useState(false);
  const [isTrueError, setIsTrueError] = useState(false);
  const [persist] = usePersist();

  const refreshAuthQuery = useRefreshAuthQuery(client, undefined, {
    enabled: persist && !isTrueError,
    retry: (failureCount, error: Project.IErrorResponse) => {
      if (failureCount > 1) return false;

      const isRefreshAuthError = messages.some((message) => {
        return error.response.errors[0].message.includes(message);
      });

      return !isRefreshAuthError;
    },
    onSuccess(data) {
      setIsTrueSuccess(true);
    },
    onError(err: Project.IErrorResponse) {
      err.response.errors.forEach((error) => {
        toast.error(error.message);
      });

      const isRefreshAuthError = messages.some((message) => {
        return err.response.errors[0].message.includes(message);
      });

      if (isRefreshAuthError) {
        setIsTrueError(true);
      }
    },
  });

  const userQuery = useGetUserQuery(client, undefined, {
    enabled: refreshAuthQuery.isSuccess,
  });

  const token = refreshAuthQuery?.data?.refreshAuth?.token;
  if (token) client.setHeader('authorization', `Bearer ${token}`);

  const user = userQuery?.data?.user;

  let [state, dispatch] = useImmerReducer<IState, IAction>((draft, action) => {
    switch (action) {
      case 'auth/addUser':
        draft.user = user;
        break;
      case 'auth/addToken':
        draft.token = token;
        break;
      case 'auth/logout':
        draft.token = undefined;
        draft.user = undefined;
        break;
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  }, initialState);

  state = useMemo(() => state, [state]);
  dispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <AuthStore.Provider value={state}>
      <AuthStoreDispatch.Provider value={dispatch}>
        {children}
      </AuthStoreDispatch.Provider>
    </AuthStore.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStore);
  if (!context)
    throw new Error('useAuthState must be used within a AuthProvider');
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthStoreDispatch);
  if (!context)
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  return context;
};

function useAuth(client: GraphQLClient) {
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [trueError, setTrueError] = useState(false);
  const [persist] = usePersist();

  const refreshAuthQuery = useRefreshAuthQuery(client, undefined, {
    enabled: persist && !trueError,
  });
  const userQuery = useGetUserQuery(client, undefined, {
    enabled: refreshAuthQuery.isSuccess,
  });

  const token = refreshAuthQuery?.data?.refreshAuth?.token;
  if (token) client.setHeader('authorization', `Bearer ${token}`);

  const user = userQuery?.data?.user;

  const reducer = authReducer(user, token);
  return useReducer(reducer, initialState);
}

function authReducer(user?: Partial<Project.IUser>, token?: string) {
  return produce((draft: IState, action: IAction) => {
    switch (action) {
      case 'auth/addUser':
        draft.user = user;
        break;
      case 'auth/addToken':
        draft.token = token;
        break;
      case 'auth/logout':
        draft.token = undefined;
        draft.user = undefined;
        break;
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  });
}
