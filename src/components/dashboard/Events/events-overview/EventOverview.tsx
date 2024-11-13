import CheckListCard from "./CheckListCard";
import CountComponent from "./CountComponent";
import EventCard from "./EventCard";
import img from "../../../../../public/event/heart.png";
import money from "../../../../../public/event/money.png";
import TextBlast from "../../Affiliates/TextBlast";
import { TicketTable } from "./TicketsTable";
import { RecentOrdersTable } from "./RecentOrderTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventOverview } from "../../../../api/fetchEventOverview";
import HomeContainerCard from "../../HomeContainerCard";
import SkeletonComponent from "../../../Skeleton";
import { Bookings } from "./RecentOrderTable";

interface EventOverviewResponse {
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
  shareUrl: string;
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
  checklist: {
    atLeastOneTicket: boolean;
    eventLive: boolean;
    connectRepNetwork: boolean;
    promoCodeCreated: boolean;
    trackingLinkCreated: boolean;
  };
}

const EventOverview = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const [eventOverviewData, setEventOverviewData] =
    useState<EventOverviewResponse>();
  const [bookings, setBookings] = useState<Bookings[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const data = [
    {
      image: "",
      text: "Total tickets sold",
      num: eventOverviewData?.totalTicketSold,
    },
    {
      image: img,
      text: "Interested People",
      num: eventOverviewData?.interestedPeople,
    },
    { image: money, text: "Revenue", num: eventOverviewData?.revenue },
    {
      image: "",
      text: "Page view count",
      num: eventOverviewData?.pageViewCount,
    },
  ];

  useEffect(() => {
    const getEventOverview = async () => {
      setLoading(true);
      try {
        if (eventId) {
          const response = await fetchEventOverview({ eventId });
          const transformedData = response.data.bookings.map(
            (booking: any) => ({
              bookingId: booking.bookingId,
              name: booking.ticketName,
              totalQuantity: `${booking.totalQuantity}`,
              price: booking.price ? `€ ${booking.price}` : "Free",
              date: booking.date,
            })
          );
          setBookings(transformedData);
          setEventOverviewData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch event overview:", error);
      } finally {
        setLoading(false);
      }
    };

    getEventOverview();
  }, [eventId]);
  return (
    <div className="max-sm:ml-2 max-sm:pr-2">
      <h1 className="text-3xl ml-10 sm:ml-14 font-medium">Event Overview</h1>
      <div className="bg-[#f8f8f8] sm:ml-8 sm:ml-2 mr-0 xl:mr-8 rounded-3xl min-w-[300px] mt-4">
        <h1 className="text-2xl text-[#9d487b] font-medium ml-14 pt-6 max-sm:pr-2">
          {eventOverviewData?.event.title}
        </h1>
        <div className="xl:flex">
          <div className="pt-10 pl-2 max-sm:pr-2 lg:pl-10">
            {loading ? (
              <SkeletonComponent className="h-[270px] min-w-[300px] sm:w-[520px] rounded-3xl" />
            ) : (
              <EventCard
                posterUrl={eventOverviewData?.event.posterUrl}
                city={eventOverviewData?.event.city}
                date={eventOverviewData?.event.date}
                day={eventOverviewData?.event.day}
                time={eventOverviewData?.event.time}
              />
            )}
          </div>
          <div className="max-sm:pl-2 max-sm:mt-4 p-2 lg:p-10 pr-2">
            {loading ? (
              <SkeletonComponent className="h-[270px] min-w-[300px] sm:w-[520px] rounded-3xl" />
            ) : (
              <CheckListCard eventOverviewData={eventOverviewData?.checklist} />
            )}
          </div>
        </div>
        <div className="flex flex-wrap max-sm:justify-center max-sm:mt-4 gap-6 p-2 ml-8 mr-8">
          {loading ? (
            <SkeletonComponent className="h-60" />
          ) : (
            data.map((i, index) => (
              <CountComponent
                key={index}
                image={i.image}
                text={i.text}
                num={i.num}
              />
            ))
          )}
        </div>
        <div className="grid min-w-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-2 pr-2 sm:ml-8 sm:mr-28 mt-4">
          <TextBlast
            className="bg-[#954b7c]"
            heading="Text Blast"
          />
          <EventTraficAndShareButton
            className="bg-[#6076a0]"
            heading="Event traffic"
            eventId={eventId}
          />
          {/* <TextBlast
            className="bg-[#6076a0]"
            heading="View participant discussion"
          /> */}
          <EventTraficAndShareButton
            className="bg-[#6076a0] text-xl"
            heading="Share"
            shareUrl={eventOverviewData?.shareUrl}
          />
        </div>
        {/* <div className="ml-8 mr-28 mt-8 sm:mt-4">
          <TrackEventComponent />
        </div> */}
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Tickets</h1>
          <TicketTable />
        </div>
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Recent Orders</h1>
          <RecentOrdersTable bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

export default EventOverview;

// const TrackEventComponent = () => {
//   return (
//     <div className="flex grid grid-cols-5 min-w-[300px]">
//       <div
//         className={`col-span-1 flex justify-center items-center h-16 pl-4 text-[1rem] border border-gray-700 bg-[#6076a0] rounded-l-full text-white`}
//       >
//         Track event
//       </div>
//       <div
//         className={`col-span-4 flex justify-between items-center h-16 text-[1rem] border border-gray-700 bg-[#eaebef] rounded-r-full text-black`}
//       >
//         <div className="ml-16">Track event</div>
//         <div className="mr-6">copy</div>
//       </div>
//     </div>
//   );
// };

interface Props {
  heading: string;
  className: string;
  eventId?: string;
  shareUrl?: string;
}
const EventTraficAndShareButton = ({
  heading,
  className,
  eventId,
  shareUrl,
}: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (heading === "Event traffic") {
      navigate(`/event-traffic/${eventId}`);
    } else if (heading === "Share") {
      shareEvent(shareUrl);
    }
  };

  const shareEvent = (url?: string) => {
    if (navigator.share && url) {
      navigator
        .share({
          title: "Check out this event!",
          url: url,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url?: string) => {
    if (url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Could not copy text: ", error);
        });
    }
  };
  return (
    <div>
      <HomeContainerCard className="h-auto sm:h-[10vh] mt-4 shadow-none">
        <div
          onClick={handleClick}
          className={`flex h-16 justify-center items-center pl-4 text-[1.2rem] border border-gray-700 rounded-full text-white cursor-pointer ${className}`}
        >
          {heading ? heading : " "}{" "}
        </div>
      </HomeContainerCard>
    </div>
  );
};
