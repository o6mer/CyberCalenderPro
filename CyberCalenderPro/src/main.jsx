import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/userhandle/login.jsx";
import Signup from "./components/userhandle/signup.jsx";
import UserConextProvider from "./contexts/UserContext";
import DashboardContextProvider from "./contexts/DashboardContext";
import ErrorPage from "./components/General/error-page";
import ProtectedRoutes from "./components/General/ProtectedRoutes";
import ClassView from "./components/classview/classselect.jsx";
import SingleClass from "./components/classview/singleClass.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/classview",
    element: (
        <ProtectedRoutes>
          <ClassView />
        </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />,
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/SingleClass/:name",
    element: <SingleClass/>
  }
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E2022",
    },
    secondary: {
      main: "#52616B",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserConextProvider>
      <DashboardContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </DashboardContextProvider>
    </UserConextProvider>
  </React.StrictMode>
);
