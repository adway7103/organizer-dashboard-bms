import axios from "axios";
import { baseUrl } from "../utils";

export const fetchTicket = async ({ ticketId }: any) => {
    
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1//bookingmatrix/details/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
