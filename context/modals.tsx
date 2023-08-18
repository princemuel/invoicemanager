'use client';

import * as React from 'react';

type ICurrentModalState = ReturnType<typeof useCurrentModal>[0] | undefined;
type ISetCurrentModalState = ReturnType<typeof useCurrentModal>[1] | undefined;

type IModalsState = ReturnType<typeof useModalState>[0] | undefined;
type ISetModalsState = ReturnType<typeof useModalState>[1] | undefined;

const CurrentModalContext = React.createContext<ICurrentModalState>(undefined);
const SetCurrentModalContext =
  React.createContext<ISetCurrentModalState>(undefined);
const ModalsContext = React.createContext<IModalsState>(undefined);
const SetModalsContext = React.createContext<ISetModalsState>(undefined);

interface IModalState extends Record<string, React.JSX.Element> {}

interface Props {
  children: React.ReactNode;
}

const useCurrentModal = () => React.useState('');
const useModalState = () => React.useState<IModalState>();

export const ModalsProvider = ({ children }: Props) => {
  const [currentModal, setCurrentModal] = useCurrentModal();
  const [modals, setModals] = useModalState();

  return (
    <ModalsContext.Provider value={modals}>
      <SetModalsContext.Provider value={setModals}>
        <CurrentModalContext.Provider value={currentModal}>
          <SetCurrentModalContext.Provider value={setCurrentModal}>
            {currentModal && modals?.[currentModal]}
            {children}
          </SetCurrentModalContext.Provider>
        </CurrentModalContext.Provider>
      </SetModalsContext.Provider>
    </ModalsContext.Provider>
  );
};

export function useModal() {
  const modals = React.useContext(ModalsContext);
  const setModals = React.useContext(SetModalsContext);
  const currentModal = React.useContext(CurrentModalContext);
  const setCurrentModal = React.useContext(SetCurrentModalContext);

  if (!modals || !setModals || !currentModal || !setCurrentModal) {
    throw new ReferenceError(`useModal must be used in a ModalsProvider`);
  }

  const register = React.useCallback(
    (name: string, Component: React.JSX.Element) => {
      if (!modals[name]) {
        setModals((state) => ({ ...state, [name]: Component }));
      }
    },
    [modals, setModals]
  );

  const open = React.useCallback(
    (name: string) => {
      setCurrentModal(name);
    },
    [setCurrentModal]
  );

  const close = React.useCallback(() => {
    setCurrentModal('');
  }, [setCurrentModal]);

  return { register, open, close };
}
