import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import ToastProvider from "../shared/ui/toast/ToastProvider";

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-(--dark-a0) min-h-dvh text-(--light-a0)">
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </div>
    </QueryClientProvider>
  );
};

export default RootLayout;
