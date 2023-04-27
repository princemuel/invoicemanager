import type { IUser } from '@src/@types';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import produce from 'immer';
import type { Dispatch } from 'react';
import * as React from 'react';
import { client } from '../lib';

interface IAuthState {
  token?: string;
  user?: Partial<IUser>;
}

type IAuthAction = 'auth/addUser' | 'auth/addToken' | 'auth/logout';

const initialState: IAuthState = {
  token: undefined,
  user: undefined,
};

const Store = React.createContext<IAuthState | undefined>(undefined);
const StoreDispatch = React.createContext<Dispatch<IAuthAction> | undefined>(
  undefined
);

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  let [state, dispatch] = useAuth();

  state = React.useMemo(() => state, [state]);
  dispatch = React.useMemo(() => dispatch, [dispatch]);

  return (
    <Store.Provider value={state}>
      <StoreDispatch.Provider value={dispatch}>
        {children}
      </StoreDispatch.Provider>
    </Store.Provider>
  );
};

export const useAuthState = () => {
  const context = React.useContext(Store);
  if (context == undefined)
    throw new Error('useAuthState must be used within a AuthProvider');

  React.useDebugValue(context.user, (user) =>
    user ? 'Logged In' : 'Logged Out'
  );

  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(StoreDispatch);
  if (context == undefined)
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  return context;
};

function useAuth() {
  const refreshAuthQuery = useRefreshAuthQuery(client, {});
  const userQuery = useGetUserQuery(
    client,
    {},
    { enabled: refreshAuthQuery.isSuccess }
  );

  const reducer = authReducer(
    userQuery?.data?.user,
    refreshAuthQuery?.data?.refreshAuth?.token
  );

  return React.useReducer(reducer, initialState);
}

function authReducer(user?: Partial<IUser>, token?: string) {
  return produce((draft: IAuthState, action: IAuthAction) => {
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
      default: {
        throw new Error(`Unhandled action type: ${action}`);
      }
    }
  });
}
