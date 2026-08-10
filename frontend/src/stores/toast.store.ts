import { create } from "zustand";
import type { ToastItemWithoutId, UseToast } from "./types/toast.types";

export const useToast = create<UseToast>((set) => ({
  toasts: [],

  addToast: (item: ToastItemWithoutId) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          ...item,
          id,
        },
      ],
    }));
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
