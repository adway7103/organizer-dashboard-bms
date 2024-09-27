import axios from "axios";
import { baseUrl } from "../utils";

export const fetchEventOverview = async ({ eventId }: any) => {    
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/overview/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
