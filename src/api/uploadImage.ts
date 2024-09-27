import axios from "axios";
import { baseUrl } from "../utils";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://${baseUrl}/api/v1/contents/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.data.contentUrl) {
      return response.data.data.contentUrl;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
