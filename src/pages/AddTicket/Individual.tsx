import "./AddTicket.css";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ASIndividual from "../../components/AdvancedSettings/ASIndividual";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTicket } from "../../api/createTicket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Ticket {
  event: string;
  categoryType: string;
  categoryName: string;
  totalSeats: number;
  ticketType: string;
  deductFeesFromTicketPrice: boolean;
  categoryPricePerPerson: string;
  ticketSaleType: string;
  saleStarts: string;
  saleEnds: string;
  additionalInfo: string;
  minPersonAllowedPerBooking: number;
  maxPersonAllowedPerBooking: string;
  promoCode: boolean;
  toggleVisibility: boolean;
  saleStartsDate: Dayjs | null;
  saleStartsTime?: Dayjs | null;
  saleEndsDate?: Dayjs | null;
  saleEndTime?: Dayjs | null;
}

const Individual: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Ticket>({
    event: "",
    categoryType: "",
    categoryName: "",
    totalSeats: 0,
    ticketType: "",
    deductFeesFromTicketPrice: false,
    categoryPricePerPerson: "",
    ticketSaleType: "",
    saleStarts: "",
    saleEnds: "",
    additionalInfo: "",
    minPersonAllowedPerBooking: 0,
    maxPersonAllowedPerBooking: "",
    promoCode: false,
    toggleVisibility: false,
    saleStartsDate: null,
    saleStartsTime: null,
    saleEndsDate: null,
    saleEndTime: null,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = localStorage.getItem("eventId");
    console.log("i got id from local storage", id);
    if (!id) {
      throw new Error("Event Id is required to create a ticket.");
    }

    const ticketData = {
      event: id,
      ticketCategories: [
        {
          categoryType: "IND",
          categoryName: formData.categoryName,
          totalSeats: formData.totalSeats,
          ticketType: formData.ticketType,
          deductFeesFromTicketPrice: formData.deductFeesFromTicketPrice,
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
      ],
    };

    try {
      await createTicket(ticketData);
      toast.success("Ticket created successfully:");
      navigate("/create-events/2");
    } catch (error) {
      toast.error("failed to creating ticket");
    }

    setFormData({
      event: "",
      categoryType: "",
      categoryName: "",
      totalSeats: 0,
      ticketType: "",
      deductFeesFromTicketPrice: false,
      categoryPricePerPerson: "",
      ticketSaleType: "",
      saleStarts: "",
      saleEnds: "",
      additionalInfo: "",
      minPersonAllowedPerBooking: 0,
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
        <h1 className="text-3xl font-bold">Add Ticket</h1>
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
            />
            <p className="flex items-center text-xs md:text-sm">
              Buyer Pays : <span> $ {formData.categoryPricePerPerson} </span>{" "}
              Per ticket
            </p>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deductFees"
            name="deductFeesFromTicketPrice"
            checked={formData.deductFeesFromTicketPrice}
            onChange={handleChange}
            className="follow rounded mx-0 w-6 h-4"
          />
          <label
            htmlFor="deductFees"
            className="col-span-1 text-lg font-medium ml-2"
          >
            Deduct Fees from Ticket Price
          </label>
        </div>
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
                This ticket should become available once another ticket sells
                out
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
                handleDateChange(newValue, "saleStartDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={formData.saleStartsTime}
              onChange={(newValue) =>
                handleDateChange(newValue, "saleStartTime")
              }
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
              onChange={(newValue) => handleDateChange(newValue, "saleEndDate")}
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={formData.saleEndTime}
              onChange={(newValue) => handleDateChange(newValue, "saleEndTime")}
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
        <div className="hidden md:grid grid-cols-3 gap-4">
          <Button
            href="/"
            style={{
              backgroundColor: "#60769D",
              color: "black",
              fontWeight: "medium",
              border: "none",
              cursor: "pointer",
              outline: "none",
            }}
          >
            CANCEL
          </Button>
          <button
            type="submit"
            className=" items-center px-4 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            CREATE TICKET
          </button>
        </div>
        <div className="flex justify-center items-center md:hidden">
          <button
            type="submit"
            className="items-center max-w-md my-4 px-16 py-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </>
  );
};

export default Individual;
