import axios from "axios";

export const fetchFollowers = async () => {
  const token = localStorage.getItem("accessToken");
  
  const response = await axios.get(
    "https://api.kafsco.com/api/v1/organizers/followers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  return response.data.data;
};
