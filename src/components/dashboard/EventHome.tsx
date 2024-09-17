import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EventGrid from "./Events/EventGrid";
import Total from "./Events/Total";
import { fetchPastEvents } from "../../api/fetchPastEvents";
import { fetchLiveEvents } from "../../api/fetchLiveEvents";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchDraftedEvents } from "../../api/fetchDraftedEvents";
import { updateEvent } from "../../api/updateEvent";

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

export const EventHome = () => {
  const location = useLocation();

  const isLiveEvents = location.pathname.includes("/live-events");
  const isPastEvents = location.pathname.includes("/past-events");
  const isDraftEvents = location.pathname.includes("/drafted-events");

  const [events, setEvents] = useState<EventData[]>([]);

  const fetchData = async () => {
    try {
      let response;
      if (isLiveEvents) {
        response = await fetchLiveEvents();
      } else if (isPastEvents) {
        response = await fetchPastEvents();
      } else {
        response = await fetchDraftedEvents();
        console.log(response);
      }

      const formattedEvents = response.events.map((event: EventData) => ({
        eventId: event.eventId,
        title: event.title,
        posterUrl: event.posterUrl,
        city: event.city,
        date: event.date,
        time: event.time,
        revenue: event.revenue,
        shareUrl: event.shareUrl,
        ticketsSold: event.ticketsSold,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
      // toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]);

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

  const handleTurnLiveButton = async (eventId: string) => {
    try {
      await updateEvent({ eventStatus: "Published" }, eventId);
      toast.success("Event is Live");
      fetchData();
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  return (
    <div className="sm:ml-8 sm:mr-16 min-w-[300px]">
      <h1 className="text-3xl font-semibold pl-4">
        {isLiveEvents && "Live Events"}
        {isPastEvents && "Past Events"}
        {isDraftEvents && "Drafted Events"}
      </h1>
      {!isDraftEvents && (
        <div className="flex flex-col md:flex-row lg:w-auto xl:w-auto gap-6 mt-6">
          <Total heading={"Total Revenue"} />
          <Total heading={"Total tickets sold"} />
        </div>
      )}

      <EventGrid
        events={events}
        handleDelete={handleDelete}
        handleTurnLiveButton={handleTurnLiveButton}
      />
    </div>
  );
};
