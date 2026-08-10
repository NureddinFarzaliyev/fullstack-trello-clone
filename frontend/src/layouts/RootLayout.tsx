import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-(--dark-a0) min-h-dvh text-(--light-a0)">
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};

export default RootLayout;
