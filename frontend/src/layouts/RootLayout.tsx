import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-(--dark-a0) min-h-dvh text-(--light-a0)">
      <Outlet />
    </div>
  );
};

export default RootLayout;
