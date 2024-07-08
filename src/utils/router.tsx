import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Error from "../pages/Error/Error";
import Individual from "../pages/AddTicket/Individual";
import Groups from "../pages/AddTicket/Groups";
import Table from "../pages/AddTicket/Table";
import CE_Page1 from "../pages/CreateEvent/CE_Page1";
import CE_Page2 from "../pages/CreateEvent/CE_Page2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/create-events",
        element: <CreateEvent />,
        children: [
          {
            path: "",
            element: <CE_Page1 />,
          },
          {
            path: "/create-events/2",
            element: <CE_Page2 />,
          },
        ]
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
