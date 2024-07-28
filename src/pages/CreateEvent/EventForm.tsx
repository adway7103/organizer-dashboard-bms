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
import EventMap from "../../components/Map/EventMap";
import FileDragNDrop from "../../components/DragNDrop/FileDragNDrop";

const EventForm: React.FC = () => {
  const { eventInfo, setEventInfo } = useEventContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target;

    setEventInfo((prevInfo) => {
      if (name === "currency") {
        return {
          ...prevInfo,
          cheapestTicket: {
            ...prevInfo.cheapestTicket,
            currency: value as string,
          },
        };
      } else if (name === "eventCategories") {
        return {
          ...prevInfo,
          eventCategories: value as string[],
        };
      }
      return prevInfo;
    });
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
        name="title"
        label="Event Name"
        placeholder="Be clear and descriptive with the title that tells people what your event is about."
        value={eventInfo.title}
        onChange={handleChange}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            height: "56px", // Adjust height as needed
          },
          "& .MuiOutlinedInput-input": {
            padding: "16px", // Adjust padding as needed
          },
        }}
      />

      <div>
        <InputLabel id="periodicity-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="eventCategories"
          multiple
          value={eventInfo.eventCategories}
          onChange={handleSelectChange}
          fullWidth
        >
          <MenuItem disabled value="">
            <em>Select category</em>
          </MenuItem>
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
          fullWidth
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
        rows={2}
        placeholder="Grab people's attention with a short description about your event."
        value={eventInfo.description}
        onChange={handleChange}
      />

      {/* <div> */}
      <FileDragNDrop />
      {/* </div> */}

      <Autocomplete
        multiple
        id="genres"
        options={tagsOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label="Add Tags" />}
        value={tagsOptions.filter((option) =>
          eventInfo.genres.includes(option.title)
        )}
        onChange={(_, newValue) =>
          setEventInfo({
            ...eventInfo,
            genres: newValue.map((option) => option.title),
          })
        }
      />

      <div>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          id="currency"
          name="currency"
          value={eventInfo.cheapestTicket.currency}
          onChange={handleSelectChange}
          fullWidth
        >
          <MenuItem value="currency 1">INR</MenuItem>
          <MenuItem value="currency 2">USD</MenuItem>
          <MenuItem value="currency 3">AED</MenuItem>
          <MenuItem value="currency 3">EUR</MenuItem>
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
          <div className="flex items-center space-x-5">
            <DatePicker
              className="w-1/2"
              value={eventInfo.eventStartDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventStartDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              className="w-1/2"
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
          <div className="flex items-center w-full space-x-5">
            <DatePicker
              className="w-1/2"
              value={eventInfo.eventEndDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "eventEndDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              className="w-1/2"
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
        <div className="flex gap-1 items-center pb-3">
          <input
            id="offline"
            type="radio"
            name="eventMode"
            value="offline"
            checked={eventInfo.eventMode === "offline"}
            onChange={handleChange}
          />
          <label htmlFor="offline" className="mr-2">
            Offline
          </label>
          <input
            id="online"
            type="radio"
            name="eventMode"
            value="online"
            checked={eventInfo.eventMode === "online"}
            onChange={handleChange}
          />
          <label htmlFor="online">Online</label>
        </div>
        <TextField
          type="search"
          name="venueAddress"
          id="location-search"
          placeholder="Search Venue"
          value={eventInfo.venueAddress.city}
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              height: "56px", // Adjust height as needed
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px", // Adjust padding as needed
            },
          }}
        />
      </div>

      <div className="py-4">
        <EventMap />
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

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        <button type="submit" className="event-form-btn">
          SAVE CHANGES
        </button>
        <Link
          to={"/create-events/2"}
          className="event-form-btn bg-black text-white"
        >
          NEXT PAGE
        </Link>
      </div>
    </form>
  );
};

export default EventForm;
