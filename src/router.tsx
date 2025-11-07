import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage";
import Loading from "./components/Loading";
import ClientsPage from "./pages/ClientsPage";
import ReportsPage from "./pages/ReportsPage";
import ConfigurationPage from "./pages/ConfigurationPage";
import RootLayout from "./layouts/RootLayout";
import SearchPage from "./pages/SearchPage";
import Page404 from "./pages/Page404";
import Register from "./pages/RegisterPage";
import App from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Page404 />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Page404 />,
  },
  {
    path: "/dashboard",
    element: <RootLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/dashboard/clients",
        element: <ClientsPage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/dashboard/reports",
        element: <ReportsPage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/dashboard/configuration",
        element: <ConfigurationPage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/dashboard/clients/search/:name",
        element: <SearchPage />,
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
]);

export default router;
