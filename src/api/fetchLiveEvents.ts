import axios from "axios"
import { baseUrl } from "../utils";

export const fetchLiveEvents = async () => {
    const token = localStorage.getItem("accessToken");
    
    const response = await axios.get(
      `https://${baseUrl}/api/v1/organizers/events?type=live`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );  
    
    return response.data.data;
  };