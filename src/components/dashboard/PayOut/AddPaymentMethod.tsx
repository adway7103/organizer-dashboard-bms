import "../../../pages/AddTicket/AddTicket.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addPaymentDetails } from "../../../api/addPaymentDetails";
import toast from "react-hot-toast";

const AddPaymentMethod = ({ refetch }: { refetch: () => void }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderFullName: "",
    currency: "",
    ifscCode: "",
    accountNumber: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addPaymentDetails({ data: formData });
      refetch();
      toast.success("Payment method added successfully");
      setFormData({
        accountHolderFullName: "",
        currency: "",
        ifscCode: "",
        accountNumber: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding payment method:", error);
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
        Add payment method
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
          Payment Method Details{" "}
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
            // onSubmit={handleSubmit}
          >
            <TextField
              id="accountHolderFullName"
              name="accountHolderFullName"
              label="Full name of the account holder"
              variant="outlined"
              value={formData.accountHolderFullName}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />

            <div>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                fullWidth
                required
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="AED">AED</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </div>

            <div className="text-xl">Account Details</div>

            <TextField
              id="ifscCode"
              name="ifscCode"
              label="IFSC code"
              variant="outlined"
              value={formData.ifscCode}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />

            <TextField
              id="accountNumber"
              name="accountNumber"
              label="Account Number"
              variant="outlined"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              fullWidth
              sx={{
                "& .MuiInputBase-root": { height: "56px" },
                "& .MuiOutlinedInput-input": { padding: "16px" },
              }}
            />

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
                onClick={handleSubmit}
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

export default AddPaymentMethod;
