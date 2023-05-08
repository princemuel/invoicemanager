import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type IAction = 'Add' | 'View' | 'Edit' | 'Delete';
type ISubject = 'Invoice';

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
      //@ts-expect-error ignore ts-error
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const Store = createContext<IModalState | null>(null);
const StoreDispatch = createContext<Dispatch<IModalActions> | null>(null);

interface Props {
  children: ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
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
  if (!context)
    throw new Error('useModalState must be used within a ModalProvider');
  return context;
};

export const useModalDispatch = () => {
  const context = useContext(StoreDispatch);
  if (!context)
    throw new Error('useModalDispatch must be used within a ModalProvider');
  return context;
};
