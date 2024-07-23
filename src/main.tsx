import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";
import "./index.css";
import { EventProvider } from "./Contexts/CreateEventContext.tsx";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
