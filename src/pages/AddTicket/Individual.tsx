import "./AddTicket.css";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ASIndividual from "../../components/AdvancedSettings/ASIndividual";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
interface Ticket {
  name: string;
  numberOfTickets: string;
  type: string;
  price: string | number;
  deductFees: boolean;
  saleOption: string;
  saleStartDate: Dayjs | null;
  saleStartTime: Dayjs | null;
  saleEndDate: Dayjs | null;
  saleEndTime: Dayjs | null;
  lastEntryDate: Dayjs | null;
  lastEntryTime: Dayjs | null;
  isVisible: boolean;
  addInfo: string;
  minTickets: string | number;
  maxTickets: string | number;
  promoCodeRequired: boolean;
  visible: boolean;
}

const Individual: React.FC = () => {
  const [formData, setFormData] = useState<Ticket>({
    name: "",
    numberOfTickets: "",
    type: "",
    price: "",
    deductFees: false,
    saleOption: "",
    saleStartDate: null,
    saleStartTime: null,
    saleEndDate: null,
    saleEndTime: null,
    lastEntryDate: null,
    lastEntryTime: null,
    isVisible: true,
    addInfo: "",
    minTickets: "",
    maxTickets: "",
    promoCodeRequired: false,
    visible: false,
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
      } else if (type === "number" && name === "price") {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data:", {
      ...formData,
      price: formData.type === "Free" ? 0 : formData.price,
    });
    setFormData({
      name: "",
      numberOfTickets: "",
      type: "",
      price: "",
      deductFees: false,
      saleOption: "",
      saleStartDate: null,
      saleStartTime: null,
      saleEndDate: null,
      saleEndTime: null,
      lastEntryDate: null,
      lastEntryTime: null,
      isVisible: true,
      addInfo: "",
      minTickets: "",
      maxTickets: "",
      promoCodeRequired: false,
      visible: false,
    });
  };

  const toggleAdvancedSettings = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="ticket-form space-y-4 mx-auto max-w-2xl pt-9 p-5">
        <h1 className="text-3xl font-bold">Add Ticket</h1>
        <h3 className="font-medium text-lg">Basic Information</h3>
        <div className="grid gap-4">
          <TextField
            id="name"
            name="name"
            label="Ticket Name"
            placeholder="General Admission"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-600"
          />
          <TextField
            id="numberOfTickets"
            name="numberOfTickets"
            label="Number of tickets"
            placeholder="Quantity"
            variant="outlined"
            value={formData.numberOfTickets}
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
                name="type"
                value="Paid"
                checked={formData.type === "Paid"}
                onChange={handleChange}
                className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
              />
              Paid
            </label>
            <label htmlFor="free" className="follow">
              <input
                type="radio"
                id="free"
                name="type"
                value="Free"
                checked={formData.type === "Free"}
                onChange={handleChange}
                className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
              />
              Free
            </label>
          </div>
        </div>
        {formData.type === "Paid" && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            <TextField
              id="price"
              name="price"
              label="Ticket Price"
              placeholder="$ 4"
              variant="outlined"
              value={formData.price}
              onChange={handleChange}
              className="flex-grow w-full mr-2 md:mr-4"
            />
            <p className="flex items-center text-xs md:text-sm">
              Buyer Pays : <span> ${formData.price}</span> Per ticket
            </p>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deductFees"
            name="deductFees"
            checked={formData.deductFees}
            onChange={handleChange}
            className="follow rounded mx-0 w-6 h-4"
          />
          <label
            htmlFor="deductFees"
            className="col-span-1 text-lg font-medium ml-2">
            Deduct Fees from Ticket Price
          </label>
        </div>
        <div className="grid gap-4">
          <label
            htmlFor="saleOption"
            className="col-span-2 text-lg font-medium">
            When should this ticket go on sale?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-2">
            <label htmlFor="setStartDate">
              <input
                type="radio"
                id="setStartDate"
                name="saleOption"
                value="setStartDate"
                checked={formData.saleOption === "setStartDate"}
                onChange={handleChange}
                className="mr-2 self-center"
              />
              Set start date
            </label>
            <label htmlFor="followOnSale">
              <input
                type="radio"
                id="followOnSale"
                name="saleOption"
                value="followOnSale"
                checked={formData.saleOption === "followOnSale"}
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
          className="flex space-x-2 text-lg font-medium">
          Sale starts
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center space-x-6">
            <DatePicker
              value={formData.saleStartDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "saleStartDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={formData.saleStartTime}
              onChange={(newValue) =>
                handleDateChange(newValue, "saleStartTime")
              }
            />
          </div>
        </LocalizationProvider>
        <label
          htmlFor="saleStart"
          className="flex space-x-2 text-lg font-medium">
          Sale ends
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex items-center space-x-6">
            <DatePicker
              value={formData.saleEndDate}
              onChange={(newValue) => handleDateChange(newValue, "saleEndDate")}
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={formData.saleEndTime}
              onChange={(newValue) => handleDateChange(newValue, "saleEndTime")}
            />
          </div>
        </LocalizationProvider>
        <label
          htmlFor="saleStart"
          className="flex space-x-2 text-lg font-medium">
          Last entry
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
        <br />
        <div className="flex flex-row">
          <label
            htmlFor=""
            className="ad col-span-1 text-lg font-medium"
            onClick={toggleAdvancedSettings}>
            Advanced Settings
          </label>
          {showAdvanced ? (
            <svg
              className="ad w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor">
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
              stroke="currentColor">
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
            }}>
            CANCEL
          </Button>
          <button
            type="submit"
            className=" items-center px-4 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            CREATE TICKET
          </button>
        </div>
        <div className="flex justify-center items-center md:hidden">
          <button
            type="submit"
            className="items-center max-w-md my-4 px-16 py-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Create Ticket
          </button>
        </div>
      </form>
    </>
  );
};

export default Individual;
