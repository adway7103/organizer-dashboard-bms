import "../../../../pages/AddTicket/AddTicket.css";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import {
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const AddVoucher: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelectChange = (event: any) => {
    setSelectedTickets(event.target.value as string[]);
    setDropdownOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          stroke-width="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Promo code
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
          <form className="ticket-form space-y-8 mx-auto p-5">
            <div className="grid gap-4">
              <TextField
                id="maxUse"
                name="maxUse"
                label="Maximum Number of Uses"
                variant="outlined"
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

            <div>
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
            </div>

            <div className="grid gap-4">
              <TextField
                id="code"
                name="code"
                label="Code"
                variant="outlined"
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
            <div className="grid gap-4">
              <TextField
                id="discountPercentage"
                name="discountPercentage"
                label="Discount Percentage"
                type="number"
                variant="outlined"
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
            <div>
              <label
                htmlFor="eventStart"
                className="flex space-x-2 text-lg pb-2"
              >
                Valid From
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex items-center space-x-5">
                  <DatePicker
                    className="w-1/2"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "16px",
                      },
                    }}
                  />
                  <p className="font-medium">at</p>
                  <TimePicker
                    className="w-1/2"
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
              </LocalizationProvider>
            </div>
            <div>
              <label htmlFor="eventEnd" className="flex space-x-2 text-lg pb-2">
                Valid Before
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex items-center space-x-5">
                  <DatePicker
                    className="w-1/2"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "56px",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "16px",
                      },
                    }}
                  />
                  <p className="font-medium">at</p>
                  <TimePicker
                    className="w-1/2"
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
              </LocalizationProvider>
            </div>
          </form>
          <div className="flex gap-4 mt-4 ml-6">
            {" "}
            <button
              onClick={handleClose}
              className="flex items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-4 rounded"
            >
              BACK
            </button>
            <button
              onClick={handleClose}
              className="flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-4 rounded"
            >
              SAVE
              {/* {loading && <Loader2 className="size-4 animate-spin" />} */}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVoucher;
