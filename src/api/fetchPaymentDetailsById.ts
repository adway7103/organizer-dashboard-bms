import axios from "axios";
import { baseUrl } from "../utils";

export const fetchPaymentDetailsById = async ({ id }: { id: string }) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/payment-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);

  return response.data.data;
};
