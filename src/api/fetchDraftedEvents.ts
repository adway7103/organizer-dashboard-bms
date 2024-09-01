import axios from "axios";

export const fetchDraftedEvents = async () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  
  const response = await axios.get(
    "https://kafsbackend-106f.onrender.com/api/v1/organizers/events?type=drafted",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data.data);
  
  return response.data.data;
};
