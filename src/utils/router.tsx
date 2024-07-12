import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Error from "../pages/Error/Error";
import Individual from "../pages/AddTicket/Individual";
import Groups from "../pages/AddTicket/Groups";
import Table from "../pages/AddTicket/Table";
import Home from "../components/dashboard/Home";
import AffiliateHome from "../components/dashboard/AffiliateHome";
import FollowerHome from "../components/dashboard/FollowerHome";
import CustomerHome from "../components/dashboard/CustomerHome";
import PayoutHome from "../components/dashboard/PayoutHome";
import { PaymentDetails } from "../components/dashboard/PayOut/PaymentDetails";

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
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/payouts",
        element: <PayoutHome />,
      },
      {
        path: "/payouts/payment-details",
        element: <PaymentDetails />,
      },
      {
        path: "/affiliate",
        element: <AffiliateHome />,
      },
      {
        path: "/followers",
        element: <FollowerHome />,
      },
      {
        path: "/customers",
        element: <CustomerHome />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
