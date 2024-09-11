import axios from "axios"

export const fetchLiveEvents = async () => {
    const token = localStorage.getItem("accessToken");
    
    const response = await axios.get(
      "https://kafsbackend-106f.onrender.com/api/v1/organizers/events?type=live",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );  
    console.log("live event",response.data);
    
    return response.data.data;
  };