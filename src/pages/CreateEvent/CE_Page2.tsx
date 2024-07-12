import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useEventContext } from "../../Contexts/CreateEventContext";

const CE_Page2: React.FC = () => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const { eventInfo, setEventInfo } = useEventContext();

  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings((prevState) => !prevState);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventInfo);
  };

  function createEvent() {
    // Send data to backend...
    console.log("Event created successfully!");
  }

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

      <h4 className="ad col-span-1 text-lg font-medium cursor-pointer flex items-center gap-2 pb-3" onClick={toggleAdvancedSettings}>
        Advanced Settings {showAdvancedSettings ? <FaAngleDown /> : <FaAngleUp />}
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
            <label htmlFor="separateBooking">Separate bookings of purchases of multiple tickets</label>
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
            <label htmlFor="limitTotal">Limit total number of tickets that can be purchased for this event</label>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        <button type="submit" className="event-form-btn">
          SAVE CHANGES
        </button>
        <button
        onClick={createEvent}
          className="event-form-btn bg-black text-white"
        >
          CREATE THIS EVENT
        </button>
      </div>
    </form>
  );
};

export default CE_Page2;
