import { Link, useParams } from "react-router-dom";
import { TicketTable } from "../events-overview/TicketsTable";
import { useEffect, useState } from "react";
import { fetchEventOverview } from "../../../../api/fetchEventOverview";

const Tickets = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventOverviewData, setEventOverviewData] =
    useState<any>();
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
    <div className="sm:ml-8 sm:mr-24">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">{eventOverviewData?.event.title}</h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-xl font-medium ml-8 ">Tickets</h1>
        <Link
          to={`/live-events/addticket/${eventId}`}
          className="bg-[#d3c282] px-4 sm:px-10 py-2 rounded-full flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Ticket
        </Link>
      </div>{" "}
      <TicketTable />
    </div>
  );
};

export default Tickets;
