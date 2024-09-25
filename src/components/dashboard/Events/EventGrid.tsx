import { MenuItem, Select } from "@mui/material";
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
  handleTurnLiveButton: (eventId: string) => void;
}

const EventGrid = ({
  events,
  handleDelete,
  handleTurnLiveButton,
}: EventGridProps) => {
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`event-overview/${eventId}`);
  };

  return (
    <div>
      <div className=" flex sm:w-auto justify-between mt-10 pr-1">
        <h1 className="text-2xl font-semibold px-4">Event list</h1>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 sm:flex-wrap sm:mr-6">
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
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
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
            handleTurnLiveButton={() => handleTurnLiveButton(event.eventId)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
