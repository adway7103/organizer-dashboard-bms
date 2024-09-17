import axios from 'axios';

export const textBlast = async (data: { subject: string; description: string }) => {
  const token = localStorage.getItem("accessToken");
  console.log("token", token);

  try {
    const response = await axios.post(
      "https://kafsbackend-106f.onrender.com/api/v1/organizers/text-blast/email",
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
    console.log(response);
  } catch (error) {
    console.error("Error sending text blast:", error);
    throw error;
  }
};
