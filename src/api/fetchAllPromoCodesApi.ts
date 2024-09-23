import axios from "axios";

interface ApiProps {
  eventId?: string;
}

export const fetchAllPromoCodes = async ({ eventId }: ApiProps) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `https://api.kafsco.com/api/v1/promo-code/coupons?eventId=${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};
