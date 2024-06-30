import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Navbar from "./components/Navbar";
// import { TextFieldProps } from "@mui/material";

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
  minTickets: number;
  maxTickets: number;
  promoCodeRequired: boolean;
  visible: boolean;
}

const AddTicket: React.FC = () => {
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
    minTickets: 1,
    maxTickets: 10,
    promoCodeRequired: false,
    visible: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    // Reset form fields
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
      minTickets: 1,
      maxTickets: 10,
      promoCodeRequired: false,
      visible: false,
    });
  };

  const toggleAdvancedSettings = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mx-auto max-w-md pt-24 p-5">
        <h1 className="text-3xl font-bold">Add Ticket</h1>
        <h3 className="font-medium text-lg">Basic Information</h3>
        <div className="grid gap-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ticket Name"
            className="col-span-1 max-w-full rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            id="numberOfTickets"
            name="numberOfTickets"
            value={formData.numberOfTickets}
            onChange={handleChange}
            placeholder="Number of tickets"
            className="col-span-1 rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="type" className="col-span-1 text-lg font-medium">
            Ticket Type
          </label>
          <div className="grid grid-cols-2 gap-0">
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ticket Price"
              className="col-span-1 rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-offset-2"
            />

            <p className="flex items-center">
              Buyer Pays: <span>${formData.price}</span> Per ticket
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
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="setStartDate" className="follow">
              <input
                type="radio"
                id="setStartDate"
                name="saleOption"
                value="setStartDate"
                checked={formData.saleOption === "setStartDate"}
                onChange={handleChange}
                className="mr-2"
              />
              Set start date
            </label>
            <label htmlFor="followOnSale" className="follow">
              <input
                type="radio"
                id="followOnSale"
                name="saleOption"
                value="followOnSale"
                checked={formData.saleOption === "followOnSale"}
                onChange={handleChange}
                className="mr-2"
              />
              Follow on
              <p className="font-light ml-5">
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
          <div className="flex items-center space-x-2">
            <DatePicker
              value={formData.saleStartDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "saleStartDate")
              }
              // renderInput={(params: TextFieldProps) => (<TextField {...params} className="rounded-md border border-gray-600 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"/>)}
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
          <div className="flex items-center space-x-2">
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
          <div className="flex items-center space-x-2">
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
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="minmaxTickets" className="font-medium">
                MIN and MAX Tickets
              </label>
              <div className="flex items-center justify-between">
                <label htmlFor="minTickets">
                  Minimum tickets per transaction
                </label>
                <input
                  type="number"
                  id="minTickets"
                  name="minTickets"
                  className="rounded-md border border-gray-600 px-3 py-2"
                  value={formData.minTickets}
                  onChange={handleChange}
                  placeholder="Minimum tickets per transaction"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="maxTickets">Maximum tickets per user</label>
                <input
                  type="number"
                  id="maxTickets"
                  name="maxTickets"
                  className="rounded-md border border-gray-600 px-3 py-2"
                  value={formData.maxTickets}
                  onChange={handleChange}
                  placeholder="Maximum tickets per user"
                />
              </div>
            </div>

            <div className="text-lg font-medium">Promo code</div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="promoCodeRequired"
                name="promoCodeRequired"
                checked={formData.promoCodeRequired}
                onChange={handleChange}
                className="follow rounded mx-0 w-6 h-4"
              />
              <label htmlFor="promoCodeRequired" className="check">
                Prevent customers from purchasing this ticket without a valid
                promo code
              </label>
            </div>

            <div className="text-lg font-medium">Toggle ticket visibility</div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visible"
                name="visible"
                checked={formData.visible}
                onChange={handleChange}
                className="follow rounded mx-0 w-6 h-4"
              />
              <label htmlFor="visible" className="check">
                This ticket should be visible on your event page, You can change
                this at any time.
              </label>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className=" items-center px-4 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            CANCEL
          </button>
          <button
            type="submit"
            className=" items-center px-4 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            CREATE TICKET
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTicket;
