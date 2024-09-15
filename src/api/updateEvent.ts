import axios from "axios";

export const updateEvent = async (data: any, eventId: any) => {
  const token = localStorage.getItem("accessToken");

  await axios.put(
    `https://kafsbackend-106f.onrender.com/api/v1/events/update/${eventId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};