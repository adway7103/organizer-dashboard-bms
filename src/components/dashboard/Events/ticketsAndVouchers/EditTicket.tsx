import "../../../../pages/AddTicket/AddTicket.css";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ASIndividual from "../../../../components/AdvancedSettings/ASIndividual";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { updateTicket } from "../../../../api/updteTicketApi";
import { fetchTicket } from "../../../../api/fetchTicket";
import { fetchEvent } from "../../../../api/fetchEvent";
import { formatCurrency } from "../../../../utils";
import { CircularProgress } from "@mui/material";

interface Ticket {
  categoryType: string;
  categoryName: string;
  totalSeats: string;
  ticketType: string;
  isPriceThresholdApplicable: boolean;
  priceThreshold: string;
  priceAfterThreshold: string;
  categoryPricePerPerson: string;
  ticketSaleType: string;
  saleStarts: string;
  saleEnds: string;
  additionalInfo: string;
  minPersonAllowedPerBooking: string;
  maxPersonAllowedPerBooking: string;
  promoCode: boolean;
  toggleVisibility: boolean;
  saleStartsDate: Dayjs | null;
  saleStartsTime?: Dayjs | null;
  saleEndsDate?: Dayjs | null;
  saleEndTime?: Dayjs | null;
}

interface CheapestTicket {
  currency: string;
  amount: number;
}

interface CurrencyState {
  cheapestTicket: CheapestTicket;
}

const EditTicket: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId, matrixId, id } = useParams();
  const [formData, setFormData] = useState<Ticket>({
    categoryType: "",
    categoryName: "",
    totalSeats: "",
    ticketType: "",
    isPriceThresholdApplicable: true,
    priceThreshold: "",
    priceAfterThreshold: "",
    categoryPricePerPerson: "",
    ticketSaleType: "",
    saleStarts: "",
    saleEnds: "",
    additionalInfo: "",
    minPersonAllowedPerBooking: "",
    maxPersonAllowedPerBooking: "",
    promoCode: false,
    toggleVisibility: false,
    saleStartsDate: null,
    saleStartsTime: null,
    saleEndsDate: null,
    saleEndTime: null,
  });

  const [currency, setCurrency] = useState<CurrencyState | null>(null);
  const [symbol, setSymbol] = useState();

  useEffect(() => {
    if (currency) {
      const symbol = currency.cheapestTicket.currency;
      const formattedCurrency = formatCurrency(symbol);
      setSymbol(formattedCurrency);
    }
  }, [currency]);

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const fetchedEvent = await fetchEvent({ eventId });

        if (fetchedEvent) {
          setCurrency({
            cheapestTicket: {
              currency: fetchedEvent.cheapestTicket?.currency || "",
              amount: fetchedEvent.cheapestTicket?.amount || 0,
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEventById();
  }, [eventId]);

  useEffect(() => {
    const fetchAndSetTicket = async () => {
      setLoading(true);
      try {
        const ticket = await fetchTicket({ ticketId: id });
        const saleStartsDate =
          ticket.saleStarts !== "Invalid Date"
            ? dayjs(ticket.saleStarts)
            : null;
        const saleEndsDate =
          ticket.saleEnds !== "Invalid Date" ? dayjs(ticket.saleEnds) : null;

        const ticketType =
          parseFloat(ticket.categoryPricePerPerson) > 0 ? "Paid" : "Free";

        const isPriceThresholdApplicable =
          ticket.isPriceThresholdApplicable === true &&
          parseFloat(ticket.priceAfterThreshold) > 0;
        setFormData({
          categoryType: ticket.categoryType,
          categoryName: ticket.categoryName,
          totalSeats: ticket.totalSeats.toString(),
          ticketType: ticketType,
          isPriceThresholdApplicable: isPriceThresholdApplicable,
          priceThreshold: ticket.priceThreshold?.toString() || "",
          priceAfterThreshold: ticket.priceAfterThreshold?.toString() || "",
          categoryPricePerPerson: ticket.categoryPricePerPerson,
          ticketSaleType: ticket.ticketSaleType,
          saleStarts: ticket.saleStarts,
          saleEnds: ticket.saleEnds,
          additionalInfo: ticket.additionalInfo,
          minPersonAllowedPerBooking: ticket.minPersonAllowedPerBooking,
          maxPersonAllowedPerBooking: ticket.maxPersonAllowedPerBooking,
          promoCode: ticket.promoCode,
          toggleVisibility: ticket.toggleVisibility,
          saleStartsDate: saleStartsDate,
          saleStartsTime: saleStartsDate ? dayjs(ticket.saleStarts) : null,
          saleEndsDate: saleEndsDate,
          saleEndTime: saleEndsDate ? dayjs(ticket.saleEnds) : null,
        });
      } catch (error) {
        toast.error("Failed to fetch ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetTicket();
  }, [id]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => {
      let updatedValue: string | number | boolean = value;

      if (type === "checkbox") {
        updatedValue = (event.target as HTMLInputElement).checked;
      } else if (type === "number") {
        updatedValue = parseFloat(value);
      }

      return {
        ...prevData,
        [name]: updatedValue,
      };
    });
  };

  const handleDateChange = (date: Dayjs | null, name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const saleStart = dayjs(formData.saleStartsDate)
    .hour(dayjs(formData.saleStartsTime).hour())
    .minute(dayjs(formData.saleStartsTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");
  const saleEnd = dayjs(formData.saleEndsDate)
    .hour(dayjs(formData.saleEndTime).hour())
    .minute(dayjs(formData.saleEndTime).minute())
    .format("YYYY-MM-DD HH:mm:ss");

  //   const validateForm = () => {
  //     return (
  //       formData.categoryName &&
  //       formData.totalSeats &&
  //       formData.ticketType &&
  //       formData.ticketSaleType
  //       // formData.saleStartsDate &&
  //       // formData.saleStartsTime &&
  //       // formData.saleEndsDate &&
  //       // formData.saleEndTime &&
  //       // formData.saleStarts &&
  //       // formData.saleEnds
  //     );
  //   };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const ticketData = {
      ticketId: id,
      data: {
        categoryType: "IND",
        categoryName: formData.categoryName,
        totalSeats: formData.totalSeats,
        ticketType: formData.ticketType,
        isPriceThresholdApplicable: formData.isPriceThresholdApplicable,
        priceThreshold: formData.priceThreshold,
        priceAfterThreshold: formData.priceAfterThreshold,
        categoryPricePerPerson: formData.categoryPricePerPerson,
        ticketSaleType: formData.ticketSaleType,
        saleStarts: saleStart,
        saleEnds: saleEnd,
        additionalInfo: formData.additionalInfo,
        minPersonAllowedPerBooking: formData.minPersonAllowedPerBooking,
        maxPersonAllowedPerBooking: formData.maxPersonAllowedPerBooking,
        promoCode: formData.promoCode,
        toggleVisibility: formData.toggleVisibility,
      },
      matrixId,
    };

    try {
      await updateTicket(ticketData);
      toast.success("Ticket Updated successfully:");
      const redirectPath =
        location.state?.from || `/live-events/event-overview/${eventId}`;
      navigate(redirectPath);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update ticket";
      toast.error(errorMessage);
      setLoading(false);
    }

    setFormData({
      categoryType: "",
      categoryName: "",
      totalSeats: "",
      ticketType: "",
      isPriceThresholdApplicable: false,
      priceThreshold: "",
      priceAfterThreshold: "",
      categoryPricePerPerson: "",
      ticketSaleType: "",
      saleStarts: "",
      saleEnds: "",
      additionalInfo: "",
      minPersonAllowedPerBooking: "",
      maxPersonAllowedPerBooking: "",
      promoCode: false,
      toggleVisibility: false,
      saleStartsDate: null,
      saleStartsTime: null,
      saleEndsDate: null,
      saleEndTime: null,
    });
  };

  const toggleAdvancedSettings = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="ticket-form space-y-4 mx-auto max-w-2xl pt-9 p-5"
      >
        {loading ? ( // Conditional rendering for loading state
          <div className="flex justify-center items-center h-[100vh]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Edit Ticket</h1>
            <h3 className="font-medium text-lg">Basic Information</h3>
            <div className="grid gap-4">
              <TextField
                id="name"
                name="categoryName"
                label="Ticket Name"
                placeholder="General Admission"
                variant="outlined"
                value={formData.categoryName}
                onChange={handleChange}
                className="border border-gray-600"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "56px", // Adjust height as needed
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "16px", // Adjust padding as needed
                  },
                }}
              />
              <TextField
                id="numberOfTickets"
                name="totalSeats"
                label="Number of tickets"
                placeholder="Quantity"
                variant="outlined"
                type="number"
                value={formData.totalSeats}
                onChange={handleChange}
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
            <div className="grid gap-4">
              <label htmlFor="type" className="col-span-1 text-lg font-medium">
                Ticket Type
              </label>
              <div className="flex gap-10">
                <label htmlFor="paid" className="follow">
                  <input
                    type="radio"
                    id="paid"
                    name="ticketType"
                    value="Paid"
                    checked={formData.ticketType === "Paid"}
                    onChange={handleChange}
                    className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
                  />
                  Paid
                </label>
                <label htmlFor="free" className="follow">
                  <input
                    type="radio"
                    id="free"
                    name="ticketType"
                    value="Free"
                    checked={formData.ticketType === "Free"}
                    onChange={handleChange}
                    className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
                  />
                  Free
                </label>
              </div>
            </div>
            {formData.ticketType === "Paid" && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                <TextField
                  id="price"
                  name="categoryPricePerPerson"
                  label="Ticket Price"
                  placeholder="$ 4"
                  variant="outlined"
                  value={formData.categoryPricePerPerson}
                  onChange={handleChange}
                  className="flex-grow w-full mr-2 md:mr-4"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "56px", // Adjust height as needed
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px", // Adjust padding as needed
                    },
                  }}
                />
                <p className="flex items-center text-xs md:text-sm">
                  Buyer Pays : {symbol}
                  {formData.categoryPricePerPerson} Per ticket
                </p>
              </div>
            )}
            <div className="grid gap-4">
              <label htmlFor="type" className="col-span-1 text-lg font-medium">
                Price Threshold Applicable ?{" "}
              </label>
              <div className="flex gap-10 ml-1">
                <label htmlFor="yes" className="follow">
                  <input
                    type="radio"
                    id="yes"
                    name="isPriceThresholdApplicable"
                    value="yes"
                    checked={formData.isPriceThresholdApplicable === true}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isPriceThresholdApplicable: true,
                      })
                    }
                    className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
                  />
                  Yes
                </label>
                <label htmlFor="no" className="follow">
                  <input
                    type="radio"
                    id="no"
                    name="isPriceThresholdApplicable"
                    value="no"
                    checked={formData.isPriceThresholdApplicable === false}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        isPriceThresholdApplicable: false,
                      })
                    }
                    className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
                  />
                  No
                </label>
              </div>
            </div>
            {formData.isPriceThresholdApplicable === true && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                {/* Input for Price Threshold */}
                <TextField
                  id="priceThreshold"
                  name="priceThreshold"
                  label="Price Threshold"
                  type="number"
                  placeholder="Enter threshold"
                  variant="outlined"
                  value={formData.priceThreshold}
                  onChange={handleChange}
                  className="flex-grow w-full mr-2 md:mr-4"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "56px", // Adjust height as needed
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px", // Adjust padding as needed
                    },
                  }}
                />

                {/* Input for Price After Threshold */}
                <TextField
                  id="priceAfterThreshold"
                  name="priceAfterThreshold"
                  label="Price After Threshold"
                  type="text"
                  placeholder="Enter price after threshold"
                  variant="outlined"
                  value={formData.priceAfterThreshold}
                  onChange={handleChange}
                  className="flex-grow w-full mr-2 md:mr-4"
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
            )}

            <div className="grid gap-4">
              <label
                htmlFor="saleOption"
                className="col-span-2 text-lg font-medium"
              >
                When should this ticket go on sale?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-2">
                <label htmlFor="setStartDate">
                  <input
                    type="radio"
                    id="setStartDate"
                    name="ticketSaleType"
                    value="setStart"
                    checked={formData.ticketSaleType === "setStart"}
                    onChange={handleChange}
                    className="mr-2 self-center"
                  />
                  Set start date
                </label>
                <label htmlFor="followOnSale">
                  <input
                    type="radio"
                    id="followOnSale"
                    name="ticketSaleType"
                    value="followOnSale"
                    checked={formData.ticketSaleType === "followOnSale"}
                    onChange={handleChange}
                    className="mr-2 self-center"
                  />
                  Follow on
                  <p className="font-thin ml-2 md:ml-5 md:mt-0 md:text-xs">
                    This ticket should become available once another ticket
                    sells out
                  </p>
                </label>
              </div>
            </div>
            <label
              htmlFor="saleStart"
              className="flex space-x-2 text-lg font-medium"
            >
              Sale starts
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex items-center space-x-6">
                <DatePicker
                  value={formData.saleStartsDate}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "saleStartsDate")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "56px", // Adjust height as needed
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px", // Adjust padding as needed
                    },
                  }}
                />
                <p className="font-medium">at</p>
                <TimePicker
                  value={formData.saleStartsTime}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "saleStartsTime")
                  }
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
            </LocalizationProvider>
            <label
              htmlFor="saleStart"
              className="flex space-x-2 text-lg font-medium"
            >
              Sale ends
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex items-center space-x-6">
                <DatePicker
                  value={formData.saleEndsDate}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "saleEndsDate")
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "56px", // Adjust height as needed
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px", // Adjust padding as needed
                    },
                  }}
                />
                <p className="font-medium">at</p>
                <TimePicker
                  value={formData.saleEndTime}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "saleEndTime")
                  }
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
            </LocalizationProvider>
            {/* <label
          htmlFor="saleStart"
          className="flex space-x-2 text-lg font-medium">
          Last entry
        </label> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center space-x-6">
            <DatePicker
              value={formData.lastEntryDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "lastEntryDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={formData.lastEntryTime}
              onChange={(newValue) =>
                handleDateChange(newValue, "lastEntryTime")
              }
            />
          </div>
        </LocalizationProvider> */}
            <br />
            <div className="flex flex-row">
              <label
                htmlFor=""
                className="ad col-span-1 text-lg font-medium"
                onClick={toggleAdvancedSettings}
              >
                Advanced Settings
              </label>
              {showAdvanced ? (
                <svg
                  className="ad w-6 h-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7 -7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="ad w-6 h-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
            {showAdvanced && (
              <ASIndividual formData={formData} handleChange={handleChange} />
            )}
            <div className="flex gap-4">
              <Link
                to={
                  location.state?.from ||
                  `/live-events/event-overview/${eventId}`
                }
              >
                {" "}
                <button className="flex items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-4 rounded">
                  CANCEL
                </button>
              </Link>
              <button
                type="submit"
                className="flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-4 rounded"
              >
                UPDATE TICKET
                {loading && <Loader2 className="size-4 animate-spin" />}
              </button>
            </div>
            {/* <div className="flex justify-center items-center md:hidden">
          <button
            type="submit"
            className="items-center max-w-md my-4 px-16 py-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Create Ticket
          </button>
        </div> */}
          </>
        )}
      </form>
    </>
  );
};

export default EditTicket;
