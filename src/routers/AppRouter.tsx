import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
