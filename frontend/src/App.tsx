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
import Board from "./pages/Board/Board";
import Home from "./pages/Home/Home";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedLayout reverse />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/me" element={<Me />} />
          <Route path="/boards/:id" element={<Board />} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
