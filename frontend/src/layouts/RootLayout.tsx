import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import ToastProvider from "../shared/ui/toast/ToastProvider";
import { StompSessionProvider } from "react-stomp-hooks";

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <StompSessionProvider
          url={`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/ws`}
        >
          <div className="bg-(--dark-a0) min-h-dvh text-(--light-a0)">
            <Outlet />
          </div>
        </StompSessionProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
