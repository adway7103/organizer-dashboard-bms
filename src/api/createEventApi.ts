import axios from "axios";

// const createEvent = async (eventData: any) => {
//   const token = localStorage.getItem("accessToken");
//   try {
//     const response = await axios.post(
//       "https://kafsbackend-106f.onrender.com/api/v1/events/create",
//       eventData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     console.error("Failed to create event:", error);
//     throw error;
//   }
// };

const createEvent = async (eventData: any) => {
    
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "https://kafsbackend-106f.onrender.com/api/v1/events/create",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const eventId = response.data.data.eventId;
    console.log("event id after creating event", eventId);
    localStorage.setItem("eventId", eventId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Failed to create event:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error(
        "Failed to create event: No response received",
        error.request
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Failed to create event:", error.message);
    }
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://kafsbackend-106f.onrender.com/api/v1/categories/getallcategories"
    );
    const { data } = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("failed to fetch categories", error);
  }
};

export default createEvent;
