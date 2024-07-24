import { Search } from "lucide-react";
import EventCard from "../Events/EventCard";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface EventData {
  image: string;
  location: string;
  time: string;
  date: string;
  revenue: string;
  ticketsSold: string;
}
const events: EventData[] = [
  {
    image: "./elp1-1.png",
    location: "Boston",
    time: "12:00 PM",
    date: "december 24, Thursday",
    revenue: "2000",
    ticketsSold: "300",
  },
  {
    image: "./elp2-2.png",
    location: "Boston",
    time: "12:00 PM",
    date: "december 24, Thursday",
    revenue: "2000",
    ticketsSold: "300",
  },
  {
    image: "./elp1-1.png",
    location: "Boston",
    time: "12:00 PM",
    date: "december 24, Thursday",
    revenue: "2000",
    ticketsSold: "300 / 2000",
  },
  {
    image: "./elp2-2.png",
    location: "Boston",
    time: "12:00 PM",
    date: "december 24, Thursday",
    revenue: "2000",
    ticketsSold: "300",
  },
];

const EventGrid = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("event-overview");
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold mt-10 px-4">Event list</h1>
      <div className="mt-4 flex flex-col md:flex-row xl:justify-between xl:pr-14 xl:mr-12  p-2 gap-4 sm:gap-6 ">
        <div className="relative flex items-center sm:w-auto ">
          <Search className="absolute left-4 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[300px] w-full  mr-8 sm:mr-0 sm:w-[300px] !pl-14 !h-12 !rounded-full !bg-[#E6E6E682] py-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
        <div className="pl-16">
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
            image={i.image}
            location={i.location}
            time={i.time}
            date={i.date}
            revenue={i.revenue}
            ticketsSold={i.ticketsSold}
            onClick={() => handleEventClick()}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
