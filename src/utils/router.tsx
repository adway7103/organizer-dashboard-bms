import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import AddTicket from "../pages/AddTicket/AddTicket";
import Error from "../pages/Error/Error";
import Dashboard from "../components/dashboard/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/events",
        element: <CreateEvent />,
      },
      {
        path: "/tickets",
        element: <AddTicket />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
