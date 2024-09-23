import axios from "axios";

export const fetchDraftedEvents = async () => {
  const token = localStorage.getItem("accessToken");
  
  const response = await axios.get(
    "https://kafsbackend-106f.onrender.com/api/v1/organizers/events?type=drafted",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  return response.data.data;
};
