'use client';

import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import { createSelectors } from '../helpers';

/*!! TODO refactor these hooks to a single hook with modal id input */
export const useRegisterModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useLoginModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useCreateInvoiceModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useEditInvoiceModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useDeleteInvoiceModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

interface IModalStore {
  [key: string]: JSX.Element;
  // @ts-expect-error
  current: string | null;
}

type IModalActions =
  | {
      type: 'modal:register';
      payload: {
        name: string;
        Component: JSX.Element;
      };
    }
  | {
      type: 'modal:open';
      payload: string;
    }
  | {
      type: 'modal:close';
    };

const reducer = (state: IModalStore, action: IModalActions) => {
  switch (action.type) {
    case 'modal:register':
      const { name, Component } = action.payload;
      return {
        ...state,
        [name]: Component,
      };
    case 'modal:open':
      return {
        ...state,
        current: action.payload,
      };
    case 'modal:close':
      return {
        ...state,
        current: null,
      };
    default:
      // @ts-expect-error
      throw new Error(`Unhandled action type: ${action?.type}`);
  }
};

const initialState = {
  current: null,
  '': <></>,
};

// export const useModalStore = ;

export const useModalsss = createSelectors(
  create(redux(reducer, initialState))
);

// const useModalStore = create((set) => ({
//   current: null,
//   '': <></>,
//   dispatch: (args: IModalActions) =>
//     set((state: IModalStore) => reducer(state, args)),
// }));
