import axios from "axios";
import { baseUrl } from "../utils";

export const fetchGuests = async ({ eventId }: { eventId?: string }) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/guest-user-list/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
