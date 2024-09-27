import axios from "axios";
import { baseUrl } from "../utils";

export const fetchScannerCode = async ({ eventId }: { eventId?: string }) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/entry-scanner/fetch/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
