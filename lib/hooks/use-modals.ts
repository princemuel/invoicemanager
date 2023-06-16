'use client';

import { create } from 'zustand';

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

export const useModalOther = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));
