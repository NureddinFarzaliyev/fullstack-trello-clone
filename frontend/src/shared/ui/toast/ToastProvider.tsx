import type { ReactNode } from "react";
import { useToast } from "../../../stores/toast.store";
import Toast from "./Toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts } = useToast();

  return (
    <>
      {children}
      <div className="toast toast-top toast-center">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </>
  );
};

export default ToastProvider;
