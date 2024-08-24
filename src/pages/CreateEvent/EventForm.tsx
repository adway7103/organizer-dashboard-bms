import React, { useEffect, useState } from "react";
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
import Places from "../../components/Map/EventMap";
import FileDragNDrop from "../../components/DragNDrop/FileDragNDrop";
import { getCategories } from "../../api/createEventApi";
import { EventInfo } from "../../Contexts/CreateEventContext";
import dayjs from "dayjs";
import createEvent from "../../api/createEventApi";
import toast from "react-hot-toast";
import { uploadImage } from "../../api/uploadImage";
import { useOrganizerContext } from "../../Contexts/OrganizerProfileContext";

const EventForm: React.FC = () => {
  const { eventInfo, setEventInfo } = useEventContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isNextPageEnabled, setIsNextPageEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);
  const { organizerProfile } = useOrganizerContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        if (fetchedCategories) {
          setCategories(fetchedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

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
      } else if (name === "periodicity") {
        return {
          ...prevInfo,
          periodicity: value as string,
        };
      }
      return prevInfo;
    });
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    setEventInfo({ ...eventInfo, [name]: newValue });
  };

  const eventStart = dayjs(eventInfo.eventStartDate)
    .hour(dayjs(eventInfo.eventStartTime).hour())
    .minute(dayjs(eventInfo.eventStartTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");
  const eventEnd = dayjs(eventInfo.eventEndDate)
    .hour(dayjs(eventInfo.eventEndTime).hour())
    .minute(dayjs(eventInfo.eventEndTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    if (!organizerProfile) {
      throw new Error("Organizer profile is required to create an event.");
    }

    const eventData: EventInfo = {
      title: eventInfo.title,
      organizer: organizerProfile.orgId,
      eventCategories: eventInfo.eventCategories,
      genres: eventInfo.genres,
      description: eventInfo.description,
      posterUrl: imageUrl,
      cheapestTicket: {
        currency: eventInfo.cheapestTicket.currency,
        amount: "10",
      },
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventMode: eventInfo.eventMode,
      venueAddress: eventInfo.venueAddress,
      venueLocation: eventInfo.venueLocation,
      refundPolicy: {
        refundTimeframe: "48h",
        policyType: eventInfo.refundPolicy.policyType,
        allRefundsApproved: eventInfo.refundPolicy.allRefundsApproved,
      },
      isRep: eventInfo.isRep,
      periodicity: eventInfo.periodicity,
    };

    try {
      await createEvent(eventData);
      toast.success("Event created successfully!");
      setIsNextPageEnabled(true);
      setLoading(false);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        // Fallback error message
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="event-form flex flex-col gap-5 pb-10">
      <TextField
        id="eventName"
        name="title"
        label="Event Name"
        placeholder="Be clear and descriptive with the title that tells people what your event is about."
        value={eventInfo.title}
        onChange={handleChange}
        fullWidth
        required
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
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="eventCategories"
          multiple
          value={eventInfo.eventCategories}
          onChange={handleSelectChange}
          fullWidth
          required
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflow: "auto",
                borderRadius: "4px",
                marginTop: "2px",
              },
            },
          }}
          sx={{
            height: "56px",
            ".MuiSelect-select": {
              padding: "10px",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
          }}
        >
          <MenuItem disabled value="">
            <em>Select category</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </MenuItem>
          ))}
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
          required
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
        required
        multiline
        rows={2}
        placeholder="Grab people's attention with a short description about your event."
        value={eventInfo.description}
        onChange={handleChange}
      />

      {/* <div> */}
      <FileDragNDrop onFileSelect={handleFileSelect} />
      {/* </div> */}

      <Autocomplete
        multiple
        id="genres"
        options={tagsOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Add Tags" required />
        )}
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
          required
        >
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="AED">AED</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
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
            required
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
            required
          />
          <label htmlFor="online">Online</label>
        </div>
      </div>

      <div>
        <Places />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="repEvent"
          name="repEvent"
          checked={eventInfo.isRep}
          onChange={(e) =>
            setEventInfo({ ...eventInfo, isRep: e.target.checked })
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
              checked={eventInfo.refundPolicy.policyType}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  refundPolicy: {
                    ...eventInfo.refundPolicy,
                    policyType: e.target.checked,
                  },
                })
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
              checked={eventInfo.refundPolicy.allRefundsApproved}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  refundPolicy: {
                    ...eventInfo.refundPolicy,
                    allRefundsApproved: e.target.checked,
                  },
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
        <div>
          {" "}
          <button
            className="flex justify-center items-center gap-4 event-form-btn"
            onClick={handleOnSubmit}
          >
            {loading ? "Saving Changes.." : "Save Changes"}{" "}
          </button>
        </div>
        <div>
          <Link
            to={isNextPageEnabled ? "/create-events/2" : "#"}
            className={`event-form-btn ${
              isNextPageEnabled
                ? "bg-black text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            <button
              type="button"
              disabled={!isNextPageEnabled}
              className={`px-4 py-2 rounded ${
                isNextPageEnabled
                  ? "hover:bg-secondary-dark"
                  : "cursor-not-allowed"
              }`}
            >
              Next Page
            </button>{" "}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
