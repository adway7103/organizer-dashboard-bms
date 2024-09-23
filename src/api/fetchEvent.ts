import axios from "axios";

export const fetchEvent = async ({ eventId }: any) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `api.kafsco.com/api/v1/events/geteventbyid/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
