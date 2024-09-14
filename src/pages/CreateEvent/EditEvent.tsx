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
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import VideoComponent from "../../components/DragNDrop/VideoComponent";
import { fetchEvent } from "../../api/fetchEvent.ts";
import { updateEvent } from "../../api/updateEvent.ts";
import { fetchOrganizationProfile } from "../../api/fetchProfileApi.ts";

const EditEventForm: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { eventInfo, setEventInfo } = useEventContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);

  const [trailerUrl, setTrailerUrl] = useState<any[]>([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [refundTimeframe, setRefundTimeframe] = useState("");

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

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const fetchedEvent = await fetchEvent({ eventId });

        if (fetchedEvent) {
          setEventInfo({
            organizer: fetchedEvent.organizer?._id || "",
            title: fetchedEvent.title || "",
            eventCategories: fetchedEvent.eventCategories.map(
              (cat: any) => cat._id
            ),
            genres: fetchedEvent.genres || [],
            description: fetchedEvent.description || "",
            posterUrl: fetchedEvent.posterUrl || "",
            cheapestTicket: {
              currency: fetchedEvent.cheapestTicket?.currency || "",
              amount: fetchedEvent.cheapestTicket?.amount || 0,
            },
            eventStartDate: fetchedEvent.eventStart
              ? dayjs(fetchedEvent.eventStart).startOf("day")
              : null,
            eventStartTime: fetchedEvent.eventStart
              ? dayjs(fetchedEvent.eventStart).startOf("day")
              : null,
            eventEndDate: fetchedEvent.eventEnd
              ? dayjs(fetchedEvent.eventEnd).startOf("day")
              : null,
            eventEndTime: fetchedEvent.eventEnd
              ? dayjs(fetchedEvent.eventEnd).startOf("day")
              : null,
            eventMode: fetchedEvent.eventMode || "",
            venueAddress: fetchedEvent.venueAddress || {
              name: "",
              city: "",
              country: "",
              zipcode: "",
            },
            venueLocation: fetchedEvent.venueLocation?.coordinates || {
              latitude: 0,
              longitude: 0,
            },
            refundPolicy: {
              refundTimeframe: fetchedEvent.refundPolicy?.refundTimeframe || "",
              policyType: fetchedEvent.refundPolicy?.policyType || false,
              allRefundsApproved:
                fetchedEvent.refundPolicy?.allRefundsApproved || false,
            },
            isRep: fetchedEvent.isRep || false,
            periodicity: fetchedEvent.periodicity || "",
            ageRestriction: fetchedEvent.ageRestriction || "",
            trailerUrls: fetchedEvent.trailerUrls || [],
          });
          setTrailerUrl(fetchedEvent.trailerUrls || []); // Set trailer URLs if needed
          setRefundTimeframe(fetchedEvent.refundPolicy?.refundTimeframe || ""); // Set refund timeframe if needed
        }
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEventById();
  }, [eventId, setEventInfo]);

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

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleVideoFile = (file: File | null) => {
    setSelectedFile(file);
    // if (file) {
    //   const videoUrl = URL.createObjectURL(file);
    //   setTrailerUrl((prev) => [...prev, { videoUrl }]);
    // }
  };

  const [profileData, setProfileData] = useState<any>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await fetchOrganizationProfile();
        if (fetchedProfile) {
          setProfileData(fetchedProfile);
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!profileData) {
      toast.error("Organizer profile is required to create an event.");
      setLoading(false);
      return;
    }

    const eventData: EventInfo = {
      title: eventInfo.title,
      eventCategories: eventInfo.eventCategories,
      genres: eventInfo.genres,
      description: eventInfo.description,
      posterUrl: eventInfo.posterUrl || profileData.posterUrl,
      cheapestTicket: {
        currency: eventInfo.cheapestTicket.currency,
        amount: "10",
      },
      eventStart,
      eventEnd,
      eventMode: eventInfo.eventMode,
      venueAddress: eventInfo.venueAddress,
      venueLocation: {
        latitude: eventInfo.venueLocation?.latitude ?? 0,
        longitude: eventInfo.venueLocation?.longitude ?? 0,
      },
      refundPolicy: {
        refundTimeframe: refundTimeframe || "24h",
        policyType: eventInfo.refundPolicy.policyType,
        allRefundsApproved: eventInfo.refundPolicy.allRefundsApproved,
      },
      isRep: eventInfo.isRep,
      periodicity: eventInfo.periodicity,
      ageRestriction: eventInfo.ageRestriction,
      trailerUrls: trailerUrl,
      organizer: eventInfo.organizer,
    };

    try {
      await updateEvent(eventData, eventId);
      toast.success("Event updated successfully!");
      navigate(`/live-events`);
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
            toast.error("An unexpected error occurred.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
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
        posterUrl={eventInfo.posterUrl}
      />
      <div className="flex gap-4">
        <VideoComponent
          onFileSelect={handleVideoFile}
          setTrailerUrl={setTrailerUrl}
        />
        <VideoComponent
          onFileSelect={handleVideoFile}
          setTrailerUrl={setTrailerUrl}
        />
        <VideoComponent
          onFileSelect={handleVideoFile}
          setTrailerUrl={setTrailerUrl}
        />
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
          type="number"
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
        <div className="flex flex-col gap-2 ml-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="eventPolicy"
              name="eventPolicy"
              checked={eventInfo.refundPolicy.policyType}
              onChange={(e) => {
                setEventInfo({
                  ...eventInfo,
                  refundPolicy: {
                    ...eventInfo.refundPolicy,
                    policyType: e.target.checked,
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

          {accordionOpen && (
            <div className="ml-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refundOption1"
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
                  <label htmlFor="refundOption1" className="text-sm ml-3">
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
        <Link to={"/live-events"}>
          <button className="flex flex-row items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-10 rounded">
            CANCEL
          </button>
        </Link>
        <div>
          <button
            className={`flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-10 rounded`}
            onClick={(e) => handleOnSubmit(e)}
          >
            UPDATE EVENT
            {loading && <Loader2 className="size-4 animate-spin" />}
          </button>
        </div>
      </div>
    </form>
  );
};

const EditEvent = () => {
  return (
    <div className="create-event md:w-1/2 w-full md:px-0 px-10 mx-auto pb-10">
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-neutral-300"></span>
      </div>
      <h1 className="font-semibold text-2xl pb-4">Edit Event</h1>
      <EditEventForm />
    </div>
  );
};

export default EditEvent;
