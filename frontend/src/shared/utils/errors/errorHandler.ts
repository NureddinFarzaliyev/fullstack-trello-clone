import { useToast } from "../../../stores/toast.store";
import type { queryError } from "./errorHandler.types";

export const handleQueryError = (error: queryError) => {
  const errorMessage =
    error.messages && error.messages.length > 0
      ? error.messages[0]
      : typeof error === "string"
        ? error
        : "An unexpected error occurred.";

  console.error("Query Error:", errorMessage);
  useToast.getState().addToast({ content: errorMessage, type: "error" });

  throw error;
};
