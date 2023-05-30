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
import { useRefreshQuery } from '../hooks';
interface IState {
  token?: string;
}

type IAction = 'auth/addToken' | 'auth/logout';

const initialState: IState = {
  token: undefined,
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
  const { data } = useRefreshQuery(client);
  const token = data?.refresh?.token;

  const reducer = authReducer(client, token);
  return useReducer(reducer, initialState);
}

function authReducer(client: GraphQLClient, token?: string) {
  return produce((draft: IState, action: IAction) => {
    switch (action) {
      case 'auth/addToken':
        client.setHeader('authorization', `Bearer ${token}`);
        draft.token = token;
        break;
      case 'auth/logout':
        client.setHeader('authorization', `Bearer`);
        draft.token = undefined;
        break;
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  });
}
