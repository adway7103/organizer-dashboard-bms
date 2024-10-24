import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import toast from "react-hot-toast";
import { TicketTable } from "./TicketTable";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { updateEvent } from "../../api/updateEvent";
import { fetchEvent } from "../../api/fetchEvent";

interface dataProps {
  isPrivate: boolean;
  entryCondition: boolean;
  seperateBooking: boolean;
  limitTotalTicket: boolean;
  lastEntryTime: string;
  eventStatus: string;
}

const EditEvent2Form: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [showAdvancedSettings, setShowAdvancedSettings] = useState(true);

  const [entryCondition, setEntryCondition] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [seperateBooking, setSeperateBooking] = useState(false);
  const [limitTotalTicket, setLimitTotalTicket] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  console.log(loadingButton);

  const [lastEntryDate, setLastEntryDate] = useState<Dayjs | null>(null);
  const [lastEntryTime, setLastEntryTime] = useState<Dayjs | null>(null);

  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchEventById = async () => {
      setLoading(true);
      try {
        const fetchedEvent = await fetchEvent({ eventId });
        if (fetchedEvent) {
          setEntryCondition(fetchedEvent.entryCondition);
          setIsPrivate(fetchedEvent.isPrivate);
          setSeperateBooking(fetchedEvent.seperateBooking);
          setLimitTotalTicket(fetchedEvent.limitTotalTicket);
          const [lastDate, lastTime] = fetchedEvent.lastEntryTime.split(" ");

          console.log(fetchedEvent.entryCondition);
          


          const formattedDate = dayjs(lastDate);
          const formattedTime = dayjs(lastTime, "HH:mm");

          console.log(formattedDate);
          console.log(formattedTime);

          setLastEntryDate(formattedDate);
          setLastEntryTime(formattedTime);
        }
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventById();
  }, [eventId]);

  // const validateForm = () => {
  //   return lastEntryDate && lastEntryTime;
  // };

  const handleOnSubmit = async (e: any, buttonType: string) => {
    e.preventDefault();
    setLoading(true);
    setLoadingButton(buttonType);

    // if (!validateForm()) {
    //   toast.error("Last entry is required");
    //   setLoading(false);
    //   return;
    // }
    const lastEntryTimeFormatted =
      lastEntryDate && lastEntryTime
        ? dayjs(lastEntryDate)
            .hour(dayjs(lastEntryTime).hour())
            .minute(dayjs(lastEntryTime).minute())
            .format("YYYY-MM-DD HH:mm")
        : "";

    const data: dataProps = {
      isPrivate,
      entryCondition,
      seperateBooking,
      limitTotalTicket,
      lastEntryTime: lastEntryTimeFormatted, // Include formatted time
      eventStatus: "Published",
    };

    try {
      await updateEvent(data, eventId);
      navigate(`/live-events`);
      toast.success("Event published successfully!");
      setLoading(false);
      setLoadingButton(null);
    } catch (error: any) {
      setLoading(false);
      setLoadingButton(null);

      if (error.isAxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400 || status === 409) {
          const errorMessage = data.message;

          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          } else if (Array.isArray(errorMessage.details)) {
            errorMessage.details.forEach((detail: { message: string }) => {
              toast.error(detail.message);
            });
          } else {
            toast.error("Invalid error format from server.");
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
      <h3 className="font-semibold text-lg">Tickets</h3>
      <button className="add-ticket-btn font-md bg-[#244f7a] text-sm my-2">
        <Link to={`/ind-tickets/${eventId}`} className="">
          Add a Ticket
        </Link>
      </button>
      <p className="font-light text-sm pt-2">
        You can add tickets later from Tickets Menu
      </p>
      {/*  flex-col items-center tickets-display*/}
      <div className="border rounded-3xl flex justify-center my-5">
        <TicketTable />
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
          {/* <h3 className="font-semibold">Entry Requirements</h3> */}

          <div className="">
            <div className="flex gap-1">
              <input
                type="checkbox"
                name="entryCondition"
                id="entryCondition"
                className="follow rounded mx-0 w-6 h-4 mt-[7px]"
                checked={entryCondition}
                onChange={(e) => setEntryCondition(e.target.checked)}
              />
              <label htmlFor="entryCondition"></label>
              <label
                htmlFor="eventStart"
                className="flex space-x-2 text-lg font-medium pb-2"
              >
                Last Entry{" "}
              </label>
            </div>

            {entryCondition ? (
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
            ) : (
              <div></div>
            )}
          </div>

          {/* <h3 className="font-semibold">Ticket Requirements</h3>
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
          </div> */}
          {/* <div className="flex items-center gap-3">
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
          </div> */}
        </div>
      )}

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        {/* <div>
          <button
            disabled={!validateForm() || loading}
            className={`px-14 flex flex-row items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 rounded ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/events", "saveChanges")}
          >
            {loadingButton === "saveChanges" ? "Loading..." : "SAVE CHANGES"}
          </button>
        </div> */}
        <Link to={"/dashboard"}>
          <button className="flex flex-row items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-10 rounded">
            Cancel
          </button>
        </Link>
        <div>
          <button
            className={`px-10 flex flex-row items-center justify-center gap-4 bg-[#244f7a] hover:bg-black text-white font-bold py-2 rounded cursor-pointer}`}
            onClick={(e) => handleOnSubmit(e, "/events")}
          >
            Update {loading && <Loader2 className="size-4 animate-spin" />}
          </button>
        </div>
      </div>
    </form>
  );
};

const EditEvent2 = () => {
  return (
    <div className="create-event md:w-1/2 w-full md:px-0 px-10 mx-auto pb-10">
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-neutral-300"></span>
      </div>
      <h1 className="font-semibold text-2xl pb-4">Edit Event</h1>
      <EditEvent2Form />
    </div>
  );
};

export default EditEvent2;

{
  /* <div className="flex items-center gap-3">
<input
  type="checkbox"
  name="eventIsPrivate"
  id="eventIsPrivate"
  className="follow rounded mx-0 w-6 h-4"
  checked={isPrivate}
  onChange={(e) => setIsPrivate(e.target.checked)}
/>
<label htmlFor="eventIsPrivate">Event is private</label>
</div> */
}
