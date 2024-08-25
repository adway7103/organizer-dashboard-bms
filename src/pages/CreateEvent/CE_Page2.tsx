import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs

const CE_Page2: React.FC = () => {
  const navigate = useNavigate();

  const [showAdvancedSettings, setShowAdvancedSettings] = useState(true);

  const [entryCondition, setEntryCondition] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [seperateBooking, setSeperateBooking] = useState(false);
  const [limitTotalTicket, setLimitTotalTicket] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const [lastEntryDate, setLastEntryDate] = useState<Dayjs | null>(null);
  const [lastEntryTime, setLastEntryTime] = useState<Dayjs | null>(null);

  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings((prevState) => !prevState);
  };

  const validateForm = () => {
    return entryCondition && isPrivate && seperateBooking && limitTotalTicket;
  };

  const updateEvent = async (data: any, eventId: any) => {
    console.log("update event api payload", data, "and", eventId);

    const token = localStorage.getItem("accessToken");

    const response = await axios.put(
      `https://kafsbackend-106f.onrender.com/api/v1/events/update/${eventId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("update event api response", response.data);
  };

  const handleOnSubmit = async (
    e: any,
    redirectPath: string,
    buttonType: string
  ) => {
    e.preventDefault();
    setLoading(true);
    setLoadingButton(buttonType);

    console.log("redirectPath", redirectPath);
    

    const eventId = localStorage.getItem("eventId");

    const lastEntryTimeFormatted =
      lastEntryDate && lastEntryTime
        ? dayjs(lastEntryDate)
            .hour(dayjs(lastEntryTime).hour())
            .minute(dayjs(lastEntryTime).minute())
            .format("YYYY-MM-DD HH:mm")
        : null;

    const data: any = {
      isPrivate,
      entryCondition,
      seperateBooking,
      limitTotalTicket,
      lastEntryTime: lastEntryTimeFormatted, // Include formatted time
    };

    if (buttonType === "nextPage") {
      data.eventStatus = "Published";
    }

    try {
      await updateEvent(data, eventId);
      navigate(redirectPath);
      toast.success("Event created successfully!");
      setLoading(false);
      setLoadingButton(null);
      localStorage.removeItem("eventId");
    } catch (error) {
      console.error("Error updating event", error);
      toast.error("Failed to create the event!");
      setLoading(false);
      setLoadingButton(null);
    }
  };

  const handleDateChange = (newValue: Dayjs | null, type: string) => {
    if (type === "lastEntryDate") {
      setLastEntryDate(newValue);
    } else if (type === "lastEntryTime") {
      setLastEntryTime(newValue);
    }
  };

  return (
    <form>
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
          <div>
            <label
              htmlFor="eventStart"
              className="flex space-x-2 text-lg font-medium pb-2"
            >
              Last Entry{" "}
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex items-center space-x-5">
                <DatePicker
                  className="w-1/2"
                  value={lastEntryDate}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "lastEntryDate")
                  }
                />
                <p className="font-medium">at</p>
                <TimePicker
                  className="w-1/2"
                  value={lastEntryTime}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "lastEntryTime")
                  }
                />
              </div>
            </LocalizationProvider>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="entryCondition"
              id="entryCondition"
              className="follow rounded mx-0 w-6 h-4"
              checked={entryCondition}
              onChange={(e) => setEntryCondition(e.target.checked)}
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
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            <label htmlFor="eventIsPrivate">Event is private</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="separateBooking"
              id="separateBooking"
              className="follow rounded mx-0 w-6 h-4"
              checked={seperateBooking}
              onChange={(e) => setSeperateBooking(e.target.checked)}
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
              checked={limitTotalTicket}
              onChange={(e) => setLimitTotalTicket(e.target.checked)}
            />
            <label htmlFor="limitTotal">
              Limit total number of tickets that can be purchased for this event
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        <div>
          <button
            disabled={!validateForm() || loading}
            className={`flex justify-center items-center gap-4 event-form-btn ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/events", "saveChanges")}
          >
            {loadingButton === "saveChanges" ? "Loading..." : "SAVE CHANGES"}
          </button>
        </div>
        <div>
          <button
            disabled={!validateForm() || loading}
            className={`px-14 py-2 rounded event-form-btn ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/events", "nextPage")}
          >
            {loadingButton === "nextPage" ? "Loading..." : "CREATE EVENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CE_Page2;
