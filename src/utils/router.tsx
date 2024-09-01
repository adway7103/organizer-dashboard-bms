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
import CE_Page1 from "../pages/CreateEvent/CE_Page1";
import CE_Page2 from "../pages/CreateEvent/CE_Page2";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import MessagingHome from "../components/dashboard/MessagingHome";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import Logout from "../components/auth/Logout";
import { EventHome } from "../components/dashboard/EventHome";
import EventOverview from "../components/dashboard/Events/events-overview/EventOverview";
import CreateAnAccount from "../components/auth/CreateAnAccount";
import { DraftedEvents } from "../components/dashboard/Events/DraftedEvents";
import EditIndTicket from "../pages/AddTicket/EditIndTicket";
import Tickets from "../components/dashboard/Events/ticketsAndVouchers/Tickets";
import Vouchers from "../components/dashboard/Events/ticketsAndVouchers/Vouchers";
import AddTicket from "../components/dashboard/Events/ticketsAndVouchers/AddTicket";
import EditTicket from "../components/dashboard/Events/ticketsAndVouchers/EditTicket";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, // Protected routes start here
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
                path: "2/:eventId",
                element: <CE_Page2 />,
              },
            ],
          },
          {
            path: "/ind-tickets/:eventId",
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
            path: "/profile",
            children: [
              {
                path: "",
                element: <Profile />,
              },
              {
                path: "/profile/edit",
                element: <EditProfile />,
              },
            ],
          },
          {
            path: "/messaging",
            element: <MessagingHome />,
          },
          {
            path: "/createanaccount",
            element: <CreateAnAccount />,
          },
          {
            path: "/edit-ticket/:eventId/:matrixId/:id",
            element: <EditIndTicket />,
          },
          {
            path: "/drafted-events",
            element: <DraftedEvents />,
          },
          {
            path: "/events",
            children: [
              {
                path: "",
                element: <EventHome />,
              },
              {
                path: "/events/event-overview",
                element: <EventOverview />,
              },
              {
                path: "/events/tickets",
                element: <Tickets />,
              },
              {
                path: "/events/vouchers",
                element: <Vouchers />,
              },
              {
                path: "/events/addticket",
                element: <AddTicket />,
              },
              {
                path: "/events/edit-ticket/:matrixId/:id",
                element: <EditTicket />,
              },
            ],
          },
          {
            path: "/logout",
            element: <Logout />,
          },
          {
            path: "*",
            element: <Error />,
          },
        ],
      },
    ],
  },

  {
    path: "/login/*",
    element: <PublicRoute />, // Public routes start here
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup/*",
    element: <PublicRoute />, // Public routes start here
    children: [
      {
        path: "",
        element: <Signup />,
      },
    ],
  },
]);
