import axios from "axios";

export const fetchTicket = async ({ ticketId }: any) => {
    
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `https://kafsbackend-106f.onrender.com/api/v1//bookingmatrix/details/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};
