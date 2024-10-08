import axios from "axios";
import { baseUrl } from "../utils";

interface fetchParticipantsDataApiProps {
  eventId?: string;
}

export const fetchParticipantsDataApi = async ({
  eventId,
}: fetchParticipantsDataApiProps) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://${baseUrl}/api/v1/organizers/participants/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
