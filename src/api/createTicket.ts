import axios from "axios";

interface TicketData {
  event: string;
  ticketCategories: {
    categoryType: string;
    categoryName: string;
    totalSeats: number;
    ticketType: string;
    deductFeesFromTicketPrice: boolean;
    categoryPricePerPerson: string;
    ticketSaleType: string;
    saleStarts: string;
    saleEnds: string;
    additionalInfo: string;
    minPersonAllowedPerBooking: number;
    maxPersonAllowedPerBooking: string;
    promoCode: boolean;
    toggleVisibility: boolean;

    // saleStartsDate: Dayjs | null;
    // saleStartsTime?: Dayjs | null;
    // saleEndsDate?: Dayjs | null;
    // saleEndTime?: Dayjs | null;
  }[];
}

export const createTicket = async (ticketData: TicketData) => {
  console.log("create ticket payload", ticketData);

  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "https://kafsbackend-106f.onrender.com/api/v1/bookingmatrix/create",
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("create ticket response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export default createTicket;