'use client';

import { create } from 'zustand';

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
