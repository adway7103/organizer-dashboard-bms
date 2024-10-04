import { baseUrl } from "../utils";
import axios from "axios";

export const updatePaymentDetails = async ({ data, id }: any) => {
  console.log(data);

  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/organizers/payment-details/${id}`,
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
