import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import { useEventContext } from "../../Contexts/CreateEventContext";
import { tagsOptions } from "../../utils/Constant";
import { SelectChangeEvent } from "@mui/material/Select";
import { Dayjs } from "dayjs";

const EventForm: React.FC = () => {
  const { eventInfo, setEventInfo } = useEventContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setEventInfo({ ...eventInfo, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    setEventInfo({ ...eventInfo, [name]: newValue });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventInfo);
  };

  return (
    <form
      className="event-form flex flex-col gap-5 pb-10"
      onSubmit={handleOnSubmit}
    >
      <TextField
        id="eventName"
        name="eventName"
        label="Event Name"
        placeholder="Be clear and descriptive with the title that tells people what your event is about."
        variant="outlined"
        value={eventInfo.eventName}
        onChange={handleChange}
      />

      <div>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={eventInfo.category}
          onChange={handleSelectChange}
          className="w-full"
        >
          <MenuItem value="Category 1">Category 1</MenuItem>
          <MenuItem value="Category 2">Category 2</MenuItem>
          <MenuItem value="Category 3">Category 3</MenuItem>
        </Select>
      </div>

      <div>
        <InputLabel id="periodicity-label">Periodicity (optional)</InputLabel>
        <Select
          labelId="periodicity-label"
          id="periodicity"
          name="periodicity"
          value={eventInfo.periodicity}
          onChange={handleSelectChange}
          className="w-full"
        >
          <MenuItem value="Periodicity 1">Periodicity 1</MenuItem>
          <MenuItem value="Periodicity 2">Periodicity 2</MenuItem>
          <MenuItem value="Periodicity 3">Periodicity 3</MenuItem>
        </Select>
      </div>

      <TextField
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        placeholder="Grab people's attention with a short description about your event."
        value={eventInfo.description}
        onChange={handleChange}
      />

      <Autocomplete
        multiple
        id="tags"
        options={tagsOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label="Add Tags" />}
        // value={eventInfo.tags}
        // onChange={(e, newValue) => setEventInfo({ ...eventInfo, tags: newValue })}
      />

      <div>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency"
          name="currency"
          value={eventInfo.currency}
          onChange={handleSelectChange}
          className="w-full"
        >
          <MenuItem value="currency 1">INR</MenuItem>
          <MenuItem value="currency 2">USD</MenuItem>
          <MenuItem value="currency 3">AED</MenuItem>
        </Select>
      </div>

      <div>
        <label
          htmlFor="eventStart"
          className="flex space-x-2 text-lg font-medium pb-2"
        >
          Event Starts
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center justify-between space-x-2">
            <DatePicker
              value={eventInfo.eventStartDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventStartDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={eventInfo.eventStartTime}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventStartTime")
              }
            />
          </div>
        </LocalizationProvider>
      </div>

      <div>
        <label
          htmlFor="eventEnd"
          className="flex space-x-2 text-lg font-medium pb-2"
        >
          Event Ends
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center justify-between space-x-2">
            <DatePicker
              value={eventInfo.eventEndDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventEndDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={eventInfo.eventEndTime}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventEndTime")
              }
            />
          </div>
        </LocalizationProvider>
      </div>

      <div className="location">
        <label
          htmlFor="location-search"
          className="flex space-x-2 text-lg font-medium pb-2"
        >
          Location
        </label>
        <div className="flex gap-1 items-center">
          <input
            id="offline"
            type="radio"
            name="locationType"
            value="Offline"
            checked={eventInfo.locationType === "Offline"}
            onChange={handleChange}
          />
          <label htmlFor="offline" className="mr-2">
            Offline
          </label>
          <input
            id="online"
            type="radio"
            name="locationType"
            value="Online"
            checked={eventInfo.locationType === "Online"}
            onChange={handleChange}
          />
          <label htmlFor="online">Online</label>
        </div>
        <TextField
          type="search"
          name="location"
          id="location-search"
          placeholder="Search Venue"
          className="border w-full h-10 my-2 px-4 py-2"
          value={eventInfo.location}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="repEvent"
          name="repEvent"
          checked={eventInfo.repEvent}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, repEvent: e.target.checked })
          }
          className="follow rounded mx-0 w-6 h-4"
        />
        <div className="ml-3">
          <label htmlFor="repEvent" className="text-xl">
            Rep this Event
          </label>
          <p className="text-xs">
            Set commission per ticket will be added in add ticket page
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">Refunds</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="eventPolicy"
              name="eventPolicy"
              checked={eventInfo.eventPolicy}
              onChange={(e) =>
                setEventInfo({ ...eventInfo, eventPolicy: e.target.checked })
              }
              className="follow rounded mx-0 w-6 h-4"
            />
            <label htmlFor="eventPolicy" className="text-sm ml-3">
              Set your policy (no refunds, refunds approved 24h/48h before event
              date/ send approval to organizer for each refund)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allRefundsApproved"
              name="allRefundsApproved"
              checked={eventInfo.allRefundsApproved}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  allRefundsApproved: e.target.checked,
                })
              }
              className="follow rounded mx-0 w-6 h-4"
            />
            <label htmlFor="allRefundsApproved" className="text-sm ml-3">
              All refunds are approved.
            </label>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex gap-x-8">
        <button type="submit" className="event-form-btn">
          SAVE CHANGES
        </button>
        <Link
          to={"/new-event-p2"}
          className="event-form-btn bg-black text-white"
        >
          NEXT PAGE
        </Link>
      </div>
    </form>
  );
};

export default EventForm;
