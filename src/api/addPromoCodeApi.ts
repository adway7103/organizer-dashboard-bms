import { baseUrl } from "../utils";
import axios from "axios";

export const addPromoCode = async ({ data, eventId }: any) => {    
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/promo-code/create/${eventId}`,
      data,
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
