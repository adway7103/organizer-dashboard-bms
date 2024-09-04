import CheckListCard from "./CheckListCard";
import CountComponent from "./CountComponent";
import EventCard from "./EventCard";
import img from "../../../../../public/event/heart.png";
import money from "../../../../../public/event/money.png";
import TextBlast from "../../Affiliates/TextBlast";
import { TicketTable } from "./TicketsTable";
import { RecentOrdersTable } from "./RecentOrderTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventOverview } from "../../../../api/fetchEventOverview";

interface EventOverviewResponse {
  statusCode: number;
  message: string;
    event: {
      title: string;
      posterUrl: string;
      city: string;
      date: string;
      day: string;
      time: string;
    };
    totalTicketSold: number;
    interestedPeople: string;
    revenue: string;
    pageViewCount: number;
    tickets: {
      ticketName: string;
      price: string;
      ticketSold: number;
      active: string;
    }[];
    bookings: {
      bookingId: string;
      ticketName: string;
      totalQuantity: number;
      price: string;
      date: string;
    }[];
}


const EventOverview = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventOverviewData, setEventOverviewData] = useState<EventOverviewResponse>();

  const data = [
    { image: "", text: "Total tickets sold", num: eventOverviewData?.totalTicketSold },
    { image: img, text: "Interested People", num: eventOverviewData?.interestedPeople },
    { image: money, text: "Revenue", num: eventOverviewData?.revenue },
    { image: "", text: "Page view count", num: eventOverviewData?.pageViewCount },
  ];


  useEffect(() => {
    const getEventOverview = async () => {
      try {
        if (eventId) {
          const response = await fetchEventOverview({ eventId });
          setEventOverviewData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch event overview:", error);
      }
    };

    getEventOverview();
  }, [eventId]);
  return (
    <>
      <div className="bg-[#f8f8f8] sm:ml-8 ml-2 mr-0 2xl:mr-8 rounded-3xl min-w-[300px]">
        <div className="xl:flex">
          <div className="pt-10 pl-2 max-sm:pr-2 lg:pl-10">
            <EventCard 
            posterUrl={eventOverviewData?.event.posterUrl}
            city={eventOverviewData?.event.city}
            date={eventOverviewData?.event.date}
            day={eventOverviewData?.event.day}
            time={eventOverviewData?.event.time}
            />
          </div>
          <div className="max-sm:pl-4 max-sm:mt-4 p-2 lg:p-10 pr-2">
            <CheckListCard />
          </div>
        </div>
        <div className="flex flex-wrap max-sm:mt-4 gap-6 p-2 ml-8 mr-8">
          {data.map((i, index) => (
            <CountComponent
              key={index}
              image={i.image}
              text={i.text}
              num={i.num}
              />
          ))}
        </div>
        <div className="grid min-w-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ml-8 mr-28 mt-4">
          <TextBlast className="bg-[#954b7c]" />
          <TextBlast className="bg-[#6076a0]" heading="Event traffic" />
          <TextBlast
            className="bg-[#6076a0]"
            heading="View participant discussion"
          />
          <TextBlast className="bg-[#6076a0] text-xl" heading="Share" />
        </div>
        <div className="ml-8 mr-28 mt-8 sm:mt-4">
          <TrackEventComponent />
        </div>
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Tickets</h1>
          <TicketTable />
        </div>
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Recent Orders</h1>
          <RecentOrdersTable />
        </div>
      </div>
    </>
  );
};

export default EventOverview;

const TrackEventComponent = () => {
  return (
    <div className="flex grid grid-cols-5 min-w-[300px]">
      <div
        className={`col-span-1 flex justify-center items-center h-16 pl-4 text-[1rem] border border-gray-700 bg-[#6076a0] rounded-l-full text-white`}
      >
        Track event
      </div>
      <div
        className={`col-span-4 flex justify-between items-center h-16 text-[1rem] border border-gray-700 bg-[#eaebef] rounded-r-full text-black`}
      >
        <div className="ml-16">Track event</div>
        <div className="mr-6">copy</div>
      </div>
    </div>
  );
};
