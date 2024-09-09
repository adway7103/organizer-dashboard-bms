import { Search } from "lucide-react";
import EventCard from "../Events/EventCard";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../../../api/fetchAllEvents";
import axios from "axios";
import toast from "react-hot-toast";

interface EventData {
  eventId: string;
  title: string;
  posterUrl: string;
  city: string;
  date: string;
  time: string;
  revenue: string;
  ticketsSold: string;
}

const EventGrid = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [events, setEvents] = useState<EventData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetchEvents();
      const formattedEvents = response.events.map((event: EventData) => ({
        eventId: event.eventId,
        title: event.title,
        posterUrl: event.posterUrl,
        city: event.city,
        date: event.date,
        time: event.time,
        revenue: event.revenue,
        ticketsSold: event.ticketsSold,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEventClick = (eventId: string) => {
    navigate(`event-overview/${eventId}`);
  };

  const handleDelete = async (eventId: string) => {
    const token = localStorage.getItem("accessToken");
    
    try {
      await axios.delete(
        `https://kafsbackend-106f.onrender.com/api/v1/events/delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Event Deleted successfully!");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete event");
    }
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
            className=""
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
        {events.map((i, index) => (
          <EventCard
            key={index}
            eventId={i.eventId}
            title={i.title}
            posterUrl={i.posterUrl}
            city={i.city}
            time={i.time}
            date={i.date}
            revenue={i.revenue}
            ticketsSold={i.ticketsSold}
            onClick={() => handleEventClick(i.eventId)}
            handleDelete={() => handleDelete(i.eventId)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
