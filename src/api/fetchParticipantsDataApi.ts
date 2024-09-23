import axios from "axios";

interface fetchParticipantsDataApiProps {
  eventId?: string;
}

export const fetchSalesDataApi = async ({
  eventId,
}: fetchParticipantsDataApiProps) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://api.kafsco.com/api/v1/organizers/participants/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
