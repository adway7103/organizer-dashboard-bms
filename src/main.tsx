import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from "./utils/router.jsx";
import './index.css';
import { EventProvider } from './Contexts/CreateEventContext.tsx';
import { AuthProvider } from './Contexts/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);