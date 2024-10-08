import axios from "axios";
import { baseUrl } from "../utils";

export const updateTicket = async ({ data, ticketId, matrixId }: any) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.put(
      `https://${baseUrl}/api/v1/bookingmatrix/update/${matrixId}`,
      { ticketId, updatedData: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
