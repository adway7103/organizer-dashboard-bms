import axios from "axios";
import { baseUrl } from "../utils";

export const fetchCustomers = async () => {
  const token = localStorage.getItem("accessToken");
  
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/customers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  return response.data.data;
};
