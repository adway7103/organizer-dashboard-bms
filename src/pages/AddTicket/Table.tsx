import "./AddTicket.css";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ASTable from "../../components/AdvancedSettings/ASTable";
interface Ticket {
  name: string;
  numberOfTables: string | number;
  numberOfTickets: string;
  type: string;
  price: string | number;
  deductFees: boolean;
  spend: string | number;
  saleOption: string;
  saleStartDate: Dayjs | null;
  saleStartTime: Dayjs | null;
  saleEndDate: Dayjs | null;
  saleEndTime: Dayjs | null;
  lastEntryDate: Dayjs | null;
  lastEntryTime: Dayjs | null;
  isVisible: boolean;
  addInfo: string;
  maxTickets: string | number;
  girlsTickets: string | number;
  guysTickets: string | number;
  promoCodeRequired: boolean;
  visible: boolean;
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<Ticket>({
    name: "",
    numberOfTables: "",
    numberOfTickets: "",
    type: "",
    price: "",
    deductFees: false,
    spend: "",
    saleOption: "",
    saleStartDate: null,
    saleStartTime: null,
    saleEndDate: null,
    saleEndTime: null,
    lastEntryDate: null,
    lastEntryTime: null,
    isVisible: true,
    addInfo: "",
    maxTickets: "",
    girlsTickets: "",
    guysTickets: "",
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
    setTableData((prevData) => {
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
    setTableData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data:", {
      ...tableData,
      price: tableData.type === "Free" ? 0 : tableData.price,
    });
    setTableData({
      name: "",
      numberOfTables: "",
      numberOfTickets: "",
      type: "",
      price: "",
      deductFees: false,
      spend: "",
      saleOption: "",
      saleStartDate: null,
      saleStartTime: null,
      saleEndDate: null,
      saleEndTime: null,
      lastEntryDate: null,
      lastEntryTime: null,
      isVisible: true,
      addInfo: "",
      maxTickets: "",

      girlsTickets: "",
      guysTickets: "",
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
            label="Table Name"
            placeholder="General Admission"
            variant="outlined"
            value={tableData.name}
            onChange={handleChange}
            className="border border-gray-600"
          />
          <div className="flex gap-5">
            <TextField
              id="numberOfTables"
              name="numberOfTables"
              label="Number of Tables"
              placeholder="Quantity"
              variant="outlined"
              value={tableData.numberOfTables}
              onChange={handleChange}
              className="w-full"
            />
            <TextField
              id="numberOfTickets"
              name="numberOfTickets"
              label="Number of seats per table"
              placeholder="Quantity"
              variant="outlined"
              value={tableData.numberOfTickets}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <label htmlFor="type" className="col-span-1 text-lg font-medium">
            Table Type
          </label>
          <div className="flex gap-10">
            <label htmlFor="paid" className="follow">
              <input
                type="radio"
                id="paid"
                name="type"
                value="Paid"
                checked={tableData.type === "Paid"}
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
                checked={tableData.type === "Free"}
                onChange={handleChange}
                className="mr-2 focus:ring-1 focus:ring-offset-2 focus:ring-white"
              />
              Free
            </label>
          </div>
        </div>
        {tableData.type === "Paid" && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            <TextField
              id="price"
              name="price"
              label="Table Price"
              variant="outlined"
              value={tableData.price}
              onChange={handleChange}
              className="flex-grow w-full mr-2 md:mr-4"
            />
            <p className="flex items-center text-xs md:text-sm">
              Buyer Pays : <span> ${tableData.price}</span> Per ticket
            </p>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deductFees"
            name="deductFees"
            checked={tableData.deductFees}
            onChange={handleChange}
            className="follow rounded mx-0 w-6 h-4"
          />
          <label
            htmlFor="deductFees"
            className="col-span-1 text-lg font-medium ml-2">
            Deduct Fees from Ticket Price
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <TextField
            id="spend"
            name="spend"
            label="Minimum Spend"
            variant="outlined"
            value={tableData.spend}
            onChange={handleChange}
            className="flex-grow w-full mr-2 md:mr-4"
          />
        </div>
        <div className="grid gap-4">
          <label
            htmlFor="saleOption"
            className="col-span-2 text-lg font-medium">
            When should this table go on sale?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-2">
            <label htmlFor="setStartDate">
              <input
                type="radio"
                id="setStartDate"
                name="saleOption"
                value="setStartDate"
                checked={tableData.saleOption === "setStartDate"}
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
                checked={tableData.saleOption === "followOnSale"}
                onChange={handleChange}
                className="mr-2 self-center"
              />
              Follow on
              <p className="font-thin ml-2 md:ml-5 md:mt-0 md:text-xs">
                This table should become available once another ticket sells out
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
              value={tableData.saleStartDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "saleStartDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={tableData.saleStartTime}
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
              value={tableData.saleEndDate}
              onChange={(newValue) => handleDateChange(newValue, "saleEndDate")}
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={tableData.saleEndTime}
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
              value={tableData.lastEntryDate}
              onChange={(newValue) =>
                handleDateChange(newValue, "lastEntryDate")
              }
            />
            <p className="font-medium">at</p>
            <TimePicker
              value={tableData.lastEntryTime}
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
          <ASTable tableData={tableData} handleChange={handleChange} />
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

export default Table;
