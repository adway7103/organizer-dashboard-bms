import { baseUrl } from "../utils";
import axios from "axios";

export const uploadCsv = async ({ csvFile, eventId }: any) => {
  console.log(csvFile);

  const token = localStorage.getItem("accessToken");

  try {
    const formData = new FormData();
    formData.append("file", csvFile);
    const response = await axios.post(
      `https://${baseUrl}/api/v1/third-party/upload-tickets/${eventId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
