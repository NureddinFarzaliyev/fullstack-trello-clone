import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Me from "./pages/Me/Me";
import ProtectedLayout from "./layouts/ProtectedLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1>Index page</h1>} />
        <Route element={<ProtectedLayout reverse />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/me" element={<Me />} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
