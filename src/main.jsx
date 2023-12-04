import React from "react";
import "@fontsource-variable/inter";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BudgetPage } from "./BudgetPage.jsx";
import { TxsPage } from "./TxsPage.jsx";

const router = createBrowserRouter([
  {
    // Dashboard
    path: "/",
    element: <App />,
  },
  {
    path: "/budget",
    element: <BudgetPage />,
  },
  {
    path: "/txs",
    element: <TxsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider defaultColorScheme={"dark"}>
      <CssBaseline />

      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);
