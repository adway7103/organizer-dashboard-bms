import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";
import "./index.css";
import { EventProvider } from "./Contexts/CreateEventContext.tsx";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { AccountProvider } from "./Contexts/createAnAccountContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <AccountProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </AccountProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
