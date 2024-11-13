import axios from "axios";
import { baseUrl } from "../utils";

export const textBlast = async (
  data: {
    subject: string;
    description: string;
  },
  endPoint: string
) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/organizers/email-blast/${endPoint}`,
      {
        emailSubject: data.subject,
        emailBody: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending text blast:", error);
    throw error;
  }
};

export const EventTextBlast = async (
  data: {
    subject: string;
    description: string;
  },
  eventId: any
) => {
  const token = localStorage.getItem("accessToken");
  if (!eventId) return;
  console.log(eventId);
  
  try {
    const response = await axios.post(
      `https://${baseUrl}/api/v1/organizers/email-blast/event/${eventId}`,
      {
        emailSubject: data.subject,
        emailBody: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending text blast:", error);
    throw error;
  }
};
