import axios from "axios";
import { baseUrl } from "../utils";

export const fetchTickets = async ({ eventId }: any) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(
      `https://${baseUrl}/api/v1/bookingmatrix/fetch/${eventId}?app=organizer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};
