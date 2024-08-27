import axios from "axios";

export const fetchTickets = async () => {
  const token = localStorage.getItem("accessToken");
  
  const eventId = localStorage.getItem("eventId");
  console.log(eventId);
  
  try {
    const response = await axios.get(`https://kafsbackend-106f.onrender.com/api/v1/bookingmatrix/fetch/${eventId}?app=organizer`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(response.data); 
    
    return response.data; 
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};
