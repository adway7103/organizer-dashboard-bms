import { baseUrl } from "../utils";
import axios from "axios";


const createEvent = async (eventData: any) => {
    
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/events/create`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to create event:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error(
        "Failed to create event: No response received",
        error.request
      );
    } else {
      console.error("Failed to create event:", error.message);
    }
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://${baseUrl}/api/v1/categories/getallcategories"
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    console.log("failed to fetch categories", error);
  }
};

export default createEvent;
