import axios from "axios";

export const downloadOrders = async ({ eventId }: { eventId?: string }) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `https://api.kafsco.com/api/v1/organizers/download-csv/${eventId}?type=sales`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // Set the response type to blob
    }
  );

  // Create a URL for the blob and trigger download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "event_data.csv"); // Specify the file name
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url); // Clean up the URL
};
