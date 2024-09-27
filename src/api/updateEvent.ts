import axios from "axios";
import { baseUrl } from "../utils";

export const updateEvent = async (data: any, eventId: any) => {
  const token = localStorage.getItem("accessToken");

  await axios.put(
    `https://${baseUrl}/api/v1/events/update/${eventId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
