import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type IAction = 'Add' | 'View' | 'Edit' | 'Delete';
type ISubject = 'Board' | 'Task';

type IModal = `${IAction}${ISubject}` | null;

interface IModalState {
  open: boolean;
  current: IModal;
}

type IModalActions =
  | { type: 'OPEN_MODAL'; payload: { id: IModal } }
  | { type: 'CLOSE_MODAL'; payload: { id: IModal } };

const initialState: IModalState = {
  open: false,
  current: null,
};

const Store = createContext<IModalState | null>(null);
const StoreDispatch = createContext<Dispatch<IModalActions> | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={state}>
      <StoreDispatch.Provider value={dispatch}>
        {children}
      </StoreDispatch.Provider>
    </Store.Provider>
  );
};

export const useModalState = () => {
  const context = useContext(Store);
  if (context == undefined)
    throw new Error('useModalState must be used within a ModalProvider');
  return context;
};

export const useModalDispatch = () => {
  const context = useContext(StoreDispatch);
  if (context == undefined)
    throw new Error('useModalDispatch must be used within a ModalProvider');
  return context;
};

const reducer = (state: IModalState, action: IModalActions) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        open: true,
        current: action.payload.id,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        open: false,
        current: null,
      };
    default: {
      //@ts-expect-error
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
