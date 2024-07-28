import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useEventContext } from "../../Contexts/CreateEventContext";
import createEvent from "../../api/createEventApi";
import dayjs from "dayjs";
import { EventInfo } from "../../Contexts/CreateEventContext";

const CE_Page2: React.FC = () => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const { eventInfo, setEventInfo } = useEventContext();
  const navigate = useNavigate();

  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings((prevState) => !prevState);
  };

  const eventStart = dayjs(eventInfo.eventStartDate)
    .hour(dayjs(eventInfo.eventStartTime).hour())
    .minute(dayjs(eventInfo.eventStartTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");
  const eventEnd = dayjs(eventInfo.eventEndDate)
    .hour(dayjs(eventInfo.eventEndTime).hour())
    .minute(dayjs(eventInfo.eventEndTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const eventData: EventInfo = {
      title: eventInfo.title, 
      organizer: "667f1ad0d77d353dc37dc6aa", //sending manually
      eventCategories: ["6641bb023e5581b77253fb26"], //sending manually
      genres: eventInfo.genres, 
      description: eventInfo.description, 
      posterUrl: eventInfo.posterUrl, 
      cheapestTicket: {
        currency: eventInfo.cheapestTicket.currency,
        amount: "16",
      }, //sending manually
      eventStart:eventStart, 
      eventEnd:eventEnd, 
      eventMode: eventInfo.eventMode,
      venueAddress: {
        name: "26 Wexford St",
        city: "Dublin",
        country: "Ireland",
        zipcode: "D02 HX93",
      }, //sending manually
      venueLocation: {
        latitude: -6.2682886,
        longitude: 53.3366763,
      }, //sending manually
      trailerUrls: [],
      timezone: "GMT", //sending manually
      duration: "2h", //sending manually
      ageRestriction: "18+", //sending manually
      isBookingRequired: true, //sending manually
      bookingOpeningDate: "2024-11-01T00:00:00Z", //sending manually
      bookingClosingDate: "2024-11-30T23:59:59Z", //sending manually
      languages: ["english"], //sending manually
    };

    console.log("Event Data:", eventData);

    try {
      const response = await createEvent(eventData);
      console.log("Event created successfully!", response);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-black"></span>
      </div>
      <h1 className="font-semibold text-2xl pb-4">Create Event</h1>
      <h3 className="font-semibold text-lg">Tickets</h3>
      <button className="add-ticket-btn font-light text-sm my-2">
        <Link to={"/ind-tickets"} className="add-ticket-btn">
          Add a Ticket
        </Link>
      </button>
      <p className="font-light text-sm pt-2">
        You can add tickets later from Tickets Menu
      </p>

      <div className="tickets-display flex flex-col items-center justify-center my-5">
        <IoTicketOutline className="text-9xl opacity-20" />
        <p className="font-light pt-2">You don't seem to have any bookings</p>
        {/* <div className="all-tickets"></div> */}
      </div>

      <h4
        className="ad col-span-1 text-lg font-medium cursor-pointer flex items-center gap-2 pb-3"
        onClick={toggleAdvancedSettings}
      >
        Advanced Settings
        {showAdvancedSettings ? <FaAngleDown /> : <FaAngleUp />}
      </h4>

      {showAdvancedSettings && (
        <div className="flex flex-col gap-1.5 mb-5">
          <h3 className="font-semibold">Entry Requirements</h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="lastEntry"
              id="lastEntry"
              className="follow rounded mx-0 w-6 h-4"
              checked={eventInfo.lastEntry}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  lastEntry: e.target.checked,
                })
              }
            />
            <label htmlFor="lastEntry">Last Entry time</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="entryCondition"
              id="entryCondition"
              className="follow rounded mx-0 w-6 h-4"
              checked={eventInfo.entryCondition}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  entryCondition: e.target.checked,
                })
              }
            />
            <label htmlFor="entryCondition">Entry Conditions</label>
          </div>
          <h3 className="font-semibold">Ticket Requirements</h3>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="eventIsPrivate"
              id="eventIsPrivate"
              className="follow rounded mx-0 w-6 h-4"
              checked={eventInfo.eventIsPrivate}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  eventIsPrivate: e.target.checked,
                })
              }
            />
            <label htmlFor="eventIsPrivate">Event is private</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="separateBooking"
              id="separateBooking"
              className="follow rounded mx-0 w-6 h-4"
              checked={eventInfo.separateBooking}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  separateBooking: e.target.checked,
                })
              }
            />
            <label htmlFor="separateBooking">
              Separate bookings of purchases of multiple tickets
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="limitTotal"
              id="limitTotal"
              className="follow rounded mx-0 w-6 h-4"
              checked={eventInfo.limitTotal}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  limitTotal: e.target.checked,
                })
              }
            />
            <label htmlFor="limitTotal">
              Limit total number of tickets that can be purchased for this event
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        <button type="submit" className="event-form-btn">
          <Link to={"/create-events/1"} className="event-form-btn">
            SAVE CHANGES
          </Link>
        </button>
        <button type="submit" className="event-form-btn bg-black text-white">
          CREATE THIS EVENT
        </button>
      </div>
    </form>
  );
};

export default CE_Page2;
