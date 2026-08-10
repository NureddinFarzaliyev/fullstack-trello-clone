export interface ToastItem {
  id: string;
  content: string;
  type: "error" | "success" | "info";
  duration?: number;
}

export type ToastItemWithoutId = Omit<ToastItem, "id">;

export interface UseToast {
  toasts: ToastItem[];
  addToast: (item: ToastItemWithoutId) => void;
  removeToast: (id: string) => void;
}
