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
import { useNavigate } from "react-router-dom";
import { fetchOrganizationProfile } from "../../api/fetchProfileApi.ts";
interface EventCategory {
  _id: string;
  categoryName: string;
}

interface OrganizerProfile {
  countryCode: any;
  orgId: string;
  name: string;
  slug: string;
  logoUrl: string;
  eventCategories: EventCategory[];
  facebookAccUrl: string;
  instagramAccUrl: string;
  twiiterAccUrl: string;
  followersCount: number;
  followingCount: number;
  phone: string;
  tiktokAccUrl: string;
}

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { eventInfo, setEventInfo } = useEventContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null); // Track loading state for each button
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);

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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEventInfo((prevEventInfo) => ({
  //     ...prevEventInfo,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "duration") {
      const numericValue = value.replace(/[^\d]/g, ""); // Extract numeric value
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        [name]: `${numericValue}h`, // Append "h" to the numeric value
      }));
    } else {
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        [name]: value,
      }));
    }
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

  const validateForm = () => {
    return (
      eventInfo.title &&
      eventInfo.eventCategories.length > 0 &&
      eventInfo.description &&
      eventInfo.eventStartDate &&
      eventInfo.eventStartTime &&
      eventInfo.eventEndDate &&
      eventInfo.eventEndTime &&
      eventInfo.duration &&
      eventInfo.genres &&
      eventInfo.cheapestTicket &&
      eventInfo.venueAddress &&
      eventInfo.refundPolicy &&
      eventInfo.periodicity &&
      eventInfo.eventMode &&
      eventInfo.isRep
    );
  };

  const [profileData, setProfileData] = useState<OrganizerProfile>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedCategories = await fetchOrganizationProfile();
        if (fetchedCategories) {
          setProfileData(fetchedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchProfile();
  }, []);

  const handleOnSubmit = async (
    e: any,
    redirectPath: string,
    buttonType: string
  ) => {
    e.preventDefault();
    setLoading(true);
    setLoadingButton(buttonType);

    let imageUrl = "";

    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    if (!profileData) {
      throw new Error("Organizer profile is required to create an event.");
    }

    const eventData: EventInfo = {
      title: eventInfo.title,
      organizer: profileData.orgId,
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
      duration: eventInfo.duration,
    };

    try {
      await createEvent(eventData);
      navigate(redirectPath);
      toast.success("Event created successfully!");
      setLoading(false);
      setLoadingButton(null); // Reset loading state for buttons

      setEventInfo({
        title: "",
        eventCategories: [],
        genres: [],
        description: "",
        posterUrl: "",
        cheapestTicket: {
          currency: "",
          amount: "",
        },
        eventStartDate: null,
        eventStartTime: null,
        eventEndDate: null,
        eventEndTime: null,
        eventMode: "",
        venueAddress: { name: "", city: "", country: "", zipcode: "" },
        venueLocation: { latitude: 0, longitude: 0 },
        refundPolicy: {
          refundTimeframe: "",
          policyType: false,
          allRefundsApproved: false,
        },
        isRep: false,
        periodicity: "",
        duration: "",
        organizer: "",
      });
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
      setLoadingButton(null); // Reset loading state for buttons
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
          <MenuItem value="daily">daily</MenuItem>
          <MenuItem value="weekly">weekly</MenuItem>
          <MenuItem value="monthly">monthly</MenuItem>
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

      <div>
        <label
          htmlFor="eventStart"
          className="flex space-x-2 text-lg font-medium pb-2"
        >
          Duration{" "}
        </label>
        <TextField
          id="duration"
          name="duration"
          placeholder="Enter duration in hours (e.g., 2 for 2 hours)"
          value={eventInfo.duration.replace("h", "")} // Remove "h" for display
          onChange={handleChange}
          type="number" // Use number input for numeric values
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
          <button
            disabled={!validateForm() || loading}
            className={`flex justify-center items-center gap-4 event-form-btn ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/events", "saveChanges")}
          >
            {loadingButton === "saveChanges" ? "Loading..." : "Save Changes"}
          </button>
        </div>
        <div>
          <button
            disabled={!validateForm() || loading}
            className={`px-14 py-2 rounded event-form-btn ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/create-events/2", "nextPage")}
          >
            {loadingButton === "nextPage" ? "Loading..." : "Next Page"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
