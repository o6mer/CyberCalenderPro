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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
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
