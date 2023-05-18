import type { Project } from '@src/@types';
import { GraphQLClient } from 'graphql-request';
import { produce } from 'immer';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { client } from '../client';
import { useGetUserQuery, useRefreshAuthQuery } from '../hooks';
interface IState {
  token?: string;
  user?: Partial<Project.IUser>;
}

type IAction = 'auth/addUser' | 'auth/addToken' | 'auth/logout';

const initialState: IState = {
  token: undefined,
  user: undefined,
};

const AuthStore = createContext<IState | undefined>(undefined);
const AuthStoreDispatch = createContext<Dispatch<IAction> | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useAuth(client);

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
  const refreshAuthQuery = useRefreshAuthQuery(client);
  const userQuery = useGetUserQuery(client);

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
