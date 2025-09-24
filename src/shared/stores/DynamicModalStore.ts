import { create } from "zustand";


const initialState: Omit<ModalState, 'openModal' | 'closeModal'> = {
  isOpen: false,
  componentName: null,
  modalTitle: null,
  modalDescription: null,
  withCloseBtn: false,
  modalWithFooter: false,
  modalFooterContent: null,
  modalContentClassName: null,
  hideModalTitle: false,
  enableOutsideClick: true,
};

export const useModalStore = create<ModalState>((set) => ({
  ...initialState,
  openModal: (settings) =>
    set({
      ...initialState,
      ...settings,
      isOpen: true,
    }),

  closeModal: () => set({ ...initialState }),
}));
