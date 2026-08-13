import createClient from "openapi-fetch";
import type { paths } from "./openapi-schema";

export const openApiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  credentials: "include",
  querySerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue !== undefined)
            searchParams.append(subKey, String(subValue));
        });
      } else if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  },
});
