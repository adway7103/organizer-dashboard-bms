import axios from "axios";

export const fetchEventTraffic = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(
      "https://api.kafsco.com/api/v1/organizers/event-traffic/66a09125a589381e96143b26",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch event traffic", error);
    return null;
  }
};
