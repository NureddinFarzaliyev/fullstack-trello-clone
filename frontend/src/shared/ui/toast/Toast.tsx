import { useEffect } from "react";
import type { ToastItem } from "../../../stores/types/toast.types";
import { useToast } from "../../../stores/toast.store";

const Toast = ({ toast }: { toast: ToastItem }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration ?? 5000);

    return () => clearTimeout(timer);
  }, [removeToast, toast]);

  return (
    <div className={`alert alert-${toast.type} font-bold`}>
      <span>{toast.content}</span>
    </div>
  );
};

export default Toast;
