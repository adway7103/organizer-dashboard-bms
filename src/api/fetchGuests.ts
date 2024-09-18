import axios from "axios";

export const fetchGuests = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `https://kafsbackend-106f.onrender.com/api/v1/organizers/guest-user-list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
