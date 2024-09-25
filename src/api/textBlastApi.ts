import axios from 'axios';

export const textBlast = async (data: { subject: string; description: string }) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      "https://api.kafsco.com/api/v1/organizers/text-blast/email",
      {
        subject: data.subject, 
        description: data.description, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response
  } catch (error) {
    console.error("Error sending text blast:", error);
    throw error;
  }
};
