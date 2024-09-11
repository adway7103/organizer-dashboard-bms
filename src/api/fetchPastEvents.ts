import axios from "axios";

export const fetchPastEvents = async () => {
  const token = localStorage.getItem("accessToken");
  
  const response = await axios.get(
    "https://kafsbackend-106f.onrender.com/api/v1/organizers/events?type=past",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  console.log("past event",response.data);

  return response.data.data;
};
