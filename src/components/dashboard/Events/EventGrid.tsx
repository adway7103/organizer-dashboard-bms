import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCard from "../Events/EventCard";

interface EventData {
  eventId: string;
  title: string;
  posterUrl: string;
  city: string;
  date: string;
  time: string;
  revenue: number;
  ticketsSold: number;
  shareUrl: string;
}

interface EventGridProps {
  events: EventData[];
  handleDelete: (eventId: string) => void;
}

const EventGrid = ({ events, handleDelete }: EventGridProps) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`event-overview/${eventId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-10 px-4">Event list</h1>
      <div className="mt-4 flex flex-col md:flex-row md:justify-between p-2 gap-4 sm:flex-wrap sm:mr-6">
        <div className="relative flex items-center sm:w-auto ">
          <Search className="absolute left-4 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[300px] w-full  mr-8 sm:mr-0 sm:w-[300px] !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
        <div className="max-sm:flex max-sm:justify-center max-sm:items-center">
          <span className="pr-2">Show</span>
          <Select
            defaultValue={10}
            size="small"
            sx={{
              backgroundColor: "#E6E6E682",
              paddingX: 2,
              borderRadius: 6,
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        {events.map((event, index) => (
          <EventCard
            key={index}
            eventId={event.eventId}
            title={event.title}
            posterUrl={event.posterUrl}
            city={event.city}
            time={event.time}
            date={event.date}
            revenue={event.revenue}
            shareUrl={event.shareUrl}
            ticketsSold={event.ticketsSold}
            onClick={() => handleEventClick(event.eventId)}
            handleDelete={() => handleDelete(event.eventId)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
