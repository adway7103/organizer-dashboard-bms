import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/events",
                element: <CreateEvent /> 
            },
            {
                path: "*",
                element: <Error /> 
            }
        ]
    },
])