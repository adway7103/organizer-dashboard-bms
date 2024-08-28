import axios from "axios";

export const fetchFollowers = async () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  
  const response = await axios.get(
    "https://kafsbackend-106f.onrender.com/api/v1/organizers/followers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );  
  return response.data.data;
};
