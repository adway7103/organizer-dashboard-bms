import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Error from "../pages/Error/Error";
import Individual from "../pages/AddTicket/Individual";
import Groups from "../pages/AddTicket/Groups";
import Table from "../pages/AddTicket/Table";

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
        path: "/ind-tickets",
        element: <Individual />,
      },
      {
        path: "/group-tickets",
        element: <Groups />,
      },
      {
        path: "/table-tickets",
        element: <Table />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
