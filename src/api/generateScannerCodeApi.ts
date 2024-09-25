import axios from "axios";

export const generateScannerCode = async ({
  description,
  eventId,
}: {
  description?: string;
  eventId?: string;
}) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `https://kafsbackend-106f.onrender.com/api/v1/organizers/entry-scanner/create/${eventId}`,
      { description: description },
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
