import axios from "axios";

export const createAccount = async (eventData: any) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "https://kafsbackend-106f.onrender.com/api/v1/organizers/create",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to create account:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error(
        "Failed to create account: No response received",
        error.request
      );
    } else {
      console.error("Failed to create account:", error.message);
    }
    throw error;
  }
};
