import type { queryError } from "./errorHandler.types";

export const handleQueryError = (error: queryError) => {
  console.error("ERROR: ", error.messages ? error.messages[0] : error);
  throw error;
};
