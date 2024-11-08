import axios from "axios";
import { baseUrl } from "../utils";

export const fetchEventTraffic = async ({ eventId }: any) => {  
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v1/organizers/event-traffic/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch event traffic", error);
    return null;
  }
};
