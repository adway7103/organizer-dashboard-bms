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
import { Link, useNavigate } from "react-router-dom";
import { fetchOrganizationProfile } from "../../api/fetchProfileApi.ts";
import { Loader2 } from "lucide-react";
import VideoComponent from "../../components/DragNDrop/VideoComponent";
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
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);

  const [trailerUrl, setTrailerUrl] = useState<any[]>([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [refundTimeframe, setRefundTimeframe] = useState("");

  useEffect(() => {
    setEventInfo({
      title: "",
      organizer: "",
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
      eventMode: "offline",
      venueAddress: { name: "", city: "", country: "", zipcode: "" },
      venueLocation: { latitude: 0, longitude: 0 },
      refundPolicy: {
        refundTimeframe: "",
        policyType: false,
        allRefundsApproved: false,
      },
      isRep: false,
      periodicity: "",
      eventStart: "",
      eventEnd: "",
      ageRestriction: "",
      trailerUrls: [],
      includePlatformInCartFees: true,
    });
  }, []);

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
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        [name]: checked,
      }));
    } else {
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        [name]: value,
      }));
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        setDropdownOpen(false); // Close the dropdown after selection
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

  const handleFileSelect = (file: File | string) => {
    setSelectedFile(file);
  };

  const handleVideoFile = (file: File | string) => {
    setSelectedFile(file);
    // if (file) {
    //   const videoUrl = URL.createObjectURL(file);
    //   setTrailerUrl((prev) => [...prev, { videoUrl }]);
    // }
  };

  const validateForm = () => {
    const errors = [];

    if (!eventInfo.title) errors.push("Title");
    if (eventInfo.eventCategories === null) errors.push("Event Categories");
    if (!eventInfo.description) errors.push("Description");
    if (!selectedFile) errors.push("Event Image");
    if (!eventInfo.eventStartDate) errors.push("Start Date");
    if (!eventInfo.eventStartTime) errors.push("Start Time");
    if (!eventInfo.eventEndDate) errors.push("End Date");
    if (!eventInfo.eventEndTime) errors.push("End Time");
    if (!eventInfo.genres) errors.push("Genres");
    if (!eventInfo.cheapestTicket) errors.push("Cheapest Ticket");
    if (!eventInfo.venueAddress) errors.push("Venue Address");
    if (!eventInfo.eventMode) errors.push("Event Mode");

    return errors;
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

  const handleOnSubmit = async (e: any, buttonType: string) => {
    e.preventDefault();
    setLoading(true);
    setLoadingButton(buttonType);
    const errors = validateForm();

    if (errors.length > 0) {
      toast.error(`${errors[0]} is required.`);
      setLoading(false);
      setLoadingButton(null);
      return;
    }
    console.log(loadingButton);

    if (!profileData) {
      toast.error("Organizer profile is required to create an event.");
      setLoading(false);
      setLoadingButton(null);
      return;
    }

    const eventData: EventInfo = {
      title: eventInfo.title,
      organizer: profileData.orgId,
      eventCategories: eventInfo.eventCategories,
      genres: eventInfo.genres,
      description: eventInfo.description,
      posterUrl: eventInfo.posterUrl,
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
        refundTimeframe: refundTimeframe || "no",
        policyType: eventInfo.refundPolicy.policyType,
        allRefundsApproved: eventInfo.refundPolicy.allRefundsApproved,
      },
      isRep: eventInfo.isRep,
      periodicity: eventInfo.periodicity,
      ageRestriction: eventInfo.ageRestriction || "N/A",
      trailerUrls: trailerUrl,
      includePlatformInCartFees: eventInfo.includePlatformInCartFees,
    };

    try {
      const response = await createEvent(eventData);
      const eventId = response.data?.eventId;
      if (eventId) {
        navigate(`/create-events/2/${eventId}`);
        toast.success("Event created successfully!");
      } else {
        toast.error("Event created, but no eventId found.");
      }
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
        organizer: "",
        ageRestriction: "",
        trailerUrls: [],
        includePlatformInCartFees: true,
      });
    } catch (error: any) {
      console.error(error);

      if (error.isAxiosError) {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 400 || status === 409) {
          const errorMessage = data.message;

          if (typeof errorMessage === "string") {
            toast.error(errorMessage);
          } else if (errorMessage.details) {
            // Assuming 'details' is an array of error messages
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
            height: "56px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "16px",
          },
        }}
      />

      <div>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="eventCategories"
          value={eventInfo.eventCategories}
          onChange={handleSelectChange}
          fullWidth
          required
          multiple
          open={dropdownOpen}
          onOpen={() => setDropdownOpen(true)}
          onClose={() => setDropdownOpen(false)}
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
          {categories.slice(1).map((category) => (
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
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
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
      <FileDragNDrop
        onFileSelect={handleFileSelect}
        disclaimer={"Event image needs to be 1:3"}
      />
      <div className="mb-4 grid grid-cols-3 gap-2 xl:gap-10">
        {[0, 1, 2].map((index) => (
          <VideoComponent
            key={index}
            index={index} 
            onFileSelect={handleVideoFile}
            setTrailerUrl={setTrailerUrl}
            videoUrl={trailerUrl[index] || null}
          />
        ))}
      </div>

      {/* </div> */}

      {/* <Autocomplete
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
      /> */}

      <Autocomplete
        id="genres"
        options={tagsOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Add Tags" required />
        )}
        value={
          tagsOptions.find((option) =>
            eventInfo.genres.includes(option.title)
          ) || null
        }
        onChange={(_, newValue) =>
          setEventInfo({
            ...eventInfo,
            genres: newValue ? [newValue.title] : [], // Handle single selection
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

      {/* <div>
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
      </div> */}

      <div>
        <label
          htmlFor="eventStart"
          className="flex space-x-2 text-lg font-medium pb-2"
        >
          Age Limit
        </label>
        <TextField
          id="ageLimit"
          name="ageRestriction"
          placeholder="Enter Age Limit"
          value={eventInfo.ageRestriction}
          onChange={handleChange}
          type="text"
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              height: "56px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px",
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
          {/* <input
            id="online"
            type="radio"
            name="eventMode"
            value="online"
            checked={eventInfo.eventMode === "online"}
            onChange={handleChange}
            required
          />
          <label htmlFor="online">Online</label> */}
        </div>
      </div>

      <div>
        <Places />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="includePlatformInCartFees"
          name="includePlatformInCartFees"
          checked={eventInfo.includePlatformInCartFees}
          onChange={handleChange}
          className="follow rounded mx-0 w-6 h-4"
        />
        <label htmlFor="deductFees" className="col-span-1 text-lg ml-2">
          Deduct Fees from Ticket Price
        </label>
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
        <h3 className="font-medium text-xl mb-2">Refunds</h3>
        <div className="flex flex-col gap-2 ml-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="policyType"
              name="eventPolicy"
              checked={eventInfo.refundPolicy.policyType}
              onChange={(e) => {
                setEventInfo({
                  ...eventInfo,
                  refundPolicy: {
                    ...eventInfo.refundPolicy,
                    policyType: e.target.checked,
                    allRefundsApproved:false
                  },
                });
                setAccordionOpen(e.target.checked);
              }}
              className="follow rounded w-6 h-4 ml-[2px]"
            />
            <label htmlFor="eventPolicy" className="text-sm ml-3">
              Set your policy (no refunds, refunds approved 24h/48h before event
              date/ send approval to organizer for each refund)
            </label>
          </div>

          {accordionOpen && eventInfo.refundPolicy.policyType && (
            <div className="ml-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refundOption1"
                    name="refundTimeframe"
                    value="no"
                    checked={refundTimeframe === "no"}
                    onChange={(e) => {
                      setRefundTimeframe(e.target.value);
                      setEventInfo({
                        ...eventInfo,
                        refundPolicy: {
                          ...eventInfo.refundPolicy,
                          refundTimeframe: e.target.value,
                          policyType: true,
                          allRefundsApproved: false,
                        },
                      });
                    }}
                    className="follow rounded w-6 h-4"
                  />
                  <label htmlFor="refundOption1" className="text-sm ml-3">
                    No Refunds{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refundOption2"
                    name="refundTimeframe"
                    value="24h"
                    checked={refundTimeframe === "24h"}
                    onChange={(e) => {
                      setRefundTimeframe(e.target.value);
                      setEventInfo({
                        ...eventInfo,
                        refundPolicy: {
                          ...eventInfo.refundPolicy,
                          refundTimeframe: e.target.value,
                          policyType: true,
                          allRefundsApproved: false,
                        },
                      });
                    }}
                    className="follow rounded w-6 h-4"
                  />
                  <label htmlFor="refundOption2" className="text-sm ml-3">
                    24h{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refundOption2"
                    name="refundTimeframe"
                    value="48h"
                    checked={refundTimeframe === "48h"}
                    onChange={(e) => {
                      setRefundTimeframe(e.target.value);
                      setEventInfo({
                        ...eventInfo,
                        refundPolicy: {
                          ...eventInfo.refundPolicy,
                          refundTimeframe: e.target.value,
                          policyType: true,
                          allRefundsApproved: false,
                        },
                      });
                    }}
                    className="follow rounded w-6 h-4"
                  />
                  <label htmlFor="refundOption2" className="text-sm ml-3">
                    48h{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refundOption3"
                    name="refundTimeframe"
                    value="7d"
                    checked={refundTimeframe === "7d"}
                    onChange={(e) => {
                      setRefundTimeframe(e.target.value);
                      setEventInfo({
                        ...eventInfo,
                        refundPolicy: {
                          ...eventInfo.refundPolicy,
                          refundTimeframe: e.target.value,
                          policyType: true,
                          allRefundsApproved: false,
                        },
                      });
                    }}
                    className="follow rounded w-6 h-4"
                  />
                  <label htmlFor="refundOption3" className="text-sm ml-3">
                    7d{" "}
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="radio"
              id="allRefundsApproved"
              name="eventPolicy"
              checked={eventInfo.refundPolicy.allRefundsApproved}
              onChange={(e) =>
                setEventInfo({
                  ...eventInfo,
                  refundPolicy: {
                    ...eventInfo.refundPolicy,
                    allRefundsApproved: e.target.checked,
                    policyType: false,
                  },
                })
              }
              onClick={() => {
                setRefundTimeframe("");
                setAccordionOpen(false);
              }}
              className="follow rounded w-6 h-4"
            />
            <label htmlFor="allRefundsApproved" className="text-sm ml-3">
              All refunds are approved.
            </label>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-wrap gap-5 md:justify-normal justify-center">
        {/* <div>
          <button
            disabled={!validateForm() || loading}
            className={`flex justify-center items-center gap-4 event-form-btn ${
              !validateForm() || loading ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleOnSubmit(e, "/events", "saveChanges")}
          >
            {loadingButton === "saveChanges" ? "Loading..." : "Save Changes"}
          </button>
        </div> */}
        <Link to={"/dashboard"}>
          <button className="flex flex-row items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-10 rounded">
            CANCEL
          </button>
        </Link>
        <div>
          <button
            className={`flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-10 rounded`}
            onClick={(e) => handleOnSubmit(e, "nextPage")}
          >
            NEXT PAGE
            {loading && <Loader2 className="size-4 animate-spin" />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
