import axios from "axios";
import { baseUrl } from "../utils";

export const fetchOrganizationProfile = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  return response.data.data;
};
