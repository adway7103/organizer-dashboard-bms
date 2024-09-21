import "../../../../pages/AddTicket/AddTicket.css";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { addPromoCode } from "../../../../api/addPromoCodeApi";
import { Dayjs } from "dayjs"; // Ensure you import dayjs
import toast from "react-hot-toast";

const AddVoucher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { eventId } = useParams();

  const [maxUse, setMaxUse] = useState("");
  const [minCartValue, setMinCartValue] = useState("");
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [validFrom, setValidFrom] = useState<Dayjs | null>(null);
  const [validTill, setValidTill] = useState<Dayjs | null>(null);
  const [validFromTime, setValidFromTime] = useState<Dayjs | null>(null);
  const [validTillTime, setValidTillTime] = useState<Dayjs | null>(null);
  const [discountType, setDiscountType] = useState<"percentage" | "flat">(
    "percentage"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form fields
    setMaxUse("");
    setMinCartValue("");
    setCode("");
    setDiscountPercentage("");
    setValidFrom(null);
    setValidTill(null);
    setValidFromTime(null);
    setValidTillTime(null);
  };

  const handleDateChange = (newValue: Dayjs | null, type: "from" | "till") => {
    if (type === "from") {
      setValidFrom(newValue);
    } else {
      setValidTill(newValue);
    }
  };

  const handleTimeChange = (newValue: Dayjs | null, type: "from" | "till") => {
    if (type === "from") {
      setValidFromTime(newValue);
    } else {
      setValidTillTime(newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      maximumNoOfUse: maxUse,
      validFrom: validFrom
        ? validFrom.format("YYYY-MM-DD") +
          " " +
          (validFromTime ? validFromTime.format("HH:mm") : "")
        : "",
      validTill: validTill
        ? validTill.format("YYYY-MM-DD") +
          " " +
          (validTillTime ? validTillTime.format("HH:mm") : "")
        : "",
      promoId: code,
      minimumPurchaseAmount: minCartValue,
      discountType: discountType,
      discountValue: discountPercentage,
    };

    try {
      await addPromoCode({ data, eventId });
      handleClose();
      toast.success("Promo-Code Added Successfully");
    } catch (error) {
      console.error("Failed to add promo code:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="bg-[#d3c282] max-sm:text-xs px-2 sm:px-10 py-2 rounded-full flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Promo Code
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            position: "absolute",
            top: "23%",
            left: {
              xs: "34%",
              md: "40%",
            },
            transform: "translate(-30%, -20%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            paddingLeft: {
              xs: "50px",
              sm: "120px",
            },
            fontSize: {
              xs: "1.2rem",
              sm: "2rem",
            },
          }}
        >
          Promotion Code
        </DialogTitle>
        <DialogContent
          sx={{
            padding: {
              sm: "100px",
            },
          }}
        >
          <form
            className="ticket-form space-y-8 mx-auto p-5"
            onSubmit={handleSubmit}
          >
            <TextField
              id="maxUse"
              name="maxUse"
              label="Maximum Number of Uses"
              variant="outlined"
              type="number"
              value={maxUse}
              onChange={(e) => setMaxUse(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />
            <TextField
              id="minCartValue"
              name="minCartValue"
              label="Minimum Cart Value"
              variant="outlined"
              type="number"
              value={minCartValue}
              onChange={(e) => setMinCartValue(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />
            {/* <div>
              <InputLabel id="category-label">Ticket Name</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="eventCategories"
                value={selectedTickets}
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
                  <em>Select Ticket</em>
                </MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
                <MenuItem value="General Admission">General Admission</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Early Bird">Early Bird</MenuItem>
                <MenuItem value="Group">Group</MenuItem>
              </Select>
            </div> */}
            <TextField
              id="code"
              name="code"
              label="Code"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="percentage"
                  checked={discountType === "percentage"}
                  onChange={() => setDiscountType("percentage")}
                  className="mr-2"
                />
                Percentage
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="flat"
                  checked={discountType === "flat"}
                  onChange={() => setDiscountType("flat")}
                  className="mr-2"
                />
                Flat
              </label>
            </div>

            <TextField
              id="discountPercentage"
              name="discountPercentage"
              label={
                discountType === "percentage"
                  ? "Discount Percentage"
                  : "Discount Amount"
              }
              type="number"
              variant="outlined"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />

            <div>
              <label className="flex space-x-2 text-lg pb-2">Valid From</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex items-center space-x-5">
                  <DatePicker
                    className="w-1/2"
                    value={validFrom}
                    onChange={(newValue) => handleDateChange(newValue, "from")}
                    sx={{
                      "& .MuiInputBase-root": { height: "56px" },
                      "& .MuiOutlinedInput-input": { padding: "16px" },
                    }}
                  />
                  <p className="font-medium">at</p>
                  <TimePicker
                    className="w-1/2"
                    value={validFromTime}
                    onChange={(newValue) => handleTimeChange(newValue, "from")}
                    sx={{
                      "& .MuiInputBase-root": { height: "56px" },
                      "& .MuiOutlinedInput-input": { padding: "16px" },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div>
              <label className="flex space-x-2 text-lg pb-2">Valid Till</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex items-center space-x-5">
                  <DatePicker
                    className="w-1/2"
                    value={validTill}
                    onChange={(newValue) => handleDateChange(newValue, "till")}
                    sx={{
                      "& .MuiInputBase-root": { height: "56px" },
                      "& .MuiOutlinedInput-input": { padding: "16px" },
                    }}
                  />
                  <p className="font-medium">at</p>
                  <TimePicker
                    className="w-1/2"
                    value={validTillTime}
                    onChange={(newValue) => handleTimeChange(newValue, "till")}
                    sx={{
                      "& .MuiInputBase-root": { height: "56px" },
                      "& .MuiOutlinedInput-input": { padding: "16px" },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div className="flex gap-4 mt-4 ml-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVoucher;
