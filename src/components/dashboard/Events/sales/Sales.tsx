import img from "../../../../../public/event/money.png";
import img1 from "../../../../../public/sales/Group.png";
import img2 from "../../../../../public/sales/Payments - iconSvg.co.png";
import img3 from "../../../../../public/sales/image.png";
import { RecentOrdersTable } from "../events-overview/RecentOrderTable";
import { fetchSalesDataApi } from "../../../../api/fetchSalesDataApi";
// import { SalesTable } from "./SalesTable";
import ParticipantsByTickets from "./ParticipantsByTickets";
import SalesOverTime from "./SalesChart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
interface TicketData {
  count: number;
  percentage: string;
}

interface MonthlyData {
  month: string;
  salesCount: number;
}

interface Order {
  bookingId: string;
  orderDate: string;
  name: string;
  email: string;
  noOfItems: number;
  promoCode: boolean;
  price: string;
}

interface SalesResponse {
  eventTitle: string;
  netRevenue: number;
  ticketRevenue: number;
  totalOrders: number;
  repPayments: string;
  ticketSold: string;
  ticketTransferred: number;
  ticketData: Record<string, TicketData>;
  monthlyData: MonthlyData[];
  orders: Order[];
}

const Sales = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<SalesResponse | null>(null);

  const fetchData = async () => {
    const response = await fetchSalesDataApi({ eventId });
    setEventData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-[#9d487b] font-medium ml-16">
        {eventData?.eventTitle}
      </h1>
      <div className="ml-12 mt-6">
        <h1 className="text-2xl font-medium ml-6">Sales</h1>
      </div>{" "}
      <div className="bg-[#f8f8f8] ml-2 sm:ml-8 md:ml-6 mr-2 2xl:mr-8 rounded-3xl pt-6 mt-4">
        <div className="ml-4 mr-4 md:ml-12 md:mr-24 grid gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
          <Card
            heading={"Net revenue"}
            icon={img}
            data={eventData?.netRevenue}
          />
          <Card
            heading={"Ticket revenue"}
            icon={img}
            data={eventData?.ticketRevenue}
          />
          <Card
            heading={"Total numbers of orders"}
            icon={img1}
            data={eventData?.totalOrders}
          />
          <Card
            heading={"Rep payments"}
            icon={img2}
            data={eventData?.repPayments}
          />
          <Card
            heading={"Ticket sold"}
            icon={img3}
            data={eventData?.ticketSold}
          />
          <Card
            heading={"Tickets transferred"}
            icon={img3}
            data={eventData?.ticketTransferred}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ml-4 mr-4 md:ml-12 md:mr-24 gap-4 mt-6">
          <ParticipantsByTickets ticketData={eventData?.ticketData || {}} />
          <SalesOverTime monthlyData={eventData?.monthlyData} />
        </div>
        <div className="md:ml-8 md:mr-16 md:pr-4">
          <h1 className="ml-8 mt-10 text-2xl font-medium">Orders</h1>
          <RecentOrdersTable />
        </div>
      </div>
    </>
  );
};

export default Sales;

const Card = ({ heading, icon, data }: any) => {
  return (
    <div className="border rounded-3xl w-full">
      <div className="flex ml-8 items-center p-4 gap-4">
        <div>
          <img src={icon} alt="" className="size-8" />
        </div>
        <div className="">
          <div className="text-lg">{heading}</div>
          <div>{data}</div>
        </div>
      </div>
    </div>
  );
};
