import axios from "axios";

export const addGuest = async ({ data }: any) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `https://api.kafsco.com/api/v1/organizers/guest-user-list`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
