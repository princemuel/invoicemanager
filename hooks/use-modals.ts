import { create } from 'zustand';

/*!! TODO refactor these hooks to a single hook with modal id input */
export const useRegisterModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export const useLoginModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export const useCreateInvoiceModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export const useEditInvoiceModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export const useDeleteInvoiceModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export const useCartModal = create<ModalState>((set) => ({
  isVisible: false,
  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
  toggleState: () => set((state) => ({ isVisible: !state.isVisible })),
}));
