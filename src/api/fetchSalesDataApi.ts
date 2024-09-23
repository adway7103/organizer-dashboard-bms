import axios from "axios";

interface fetchSalesDataApiProps {
  eventId?: string;
}

export const fetchSalesDataApi = async ({
  eventId,
}: fetchSalesDataApiProps) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://api.kafsco.com/api/v1/organizers/sales/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
