import { useLocation } from "react-router-dom";
import EventGrid from "./Events/EventGrid";
import Total from "./Events/Total";

export const EventHome = () => {
  const location = useLocation();

  const isLiveEvents = location.pathname.includes("/live-events");
  const isPastEvents = location.pathname.includes("/past-events");

  return (
    <div className="sm:ml-8 sm:mr-16 min-w-[300px]">
      <h1 className="text-3xl font-semibold pl-4">
        {isLiveEvents && "Live Events"}
        {isPastEvents && "Past Events"}
        
      </h1>
      <div className="flex flex-col md:flex-row lg:w-auto xl:w-auto gap-6 mt-6">
        <Total heading={"Total Revenue"} />
        <Total heading={"Total tickets sold"} />
      </div>
      <EventGrid />
    </div>
  );
};
