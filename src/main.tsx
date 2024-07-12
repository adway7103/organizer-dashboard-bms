import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from "./utils/router.jsx";
import './index.css';
import { EventProvider } from './Contexts/CreateEventContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <EventProvider>
        <RouterProvider router={router} />
     </EventProvider>
  </React.StrictMode>,
);