import "../../../../pages/AddTicket/AddTicket.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { addGuest } from "../../../../api/addGuestApi";
import toast from "react-hot-toast";
type NewGuestlistProps = {
  refetch: () => Promise<void>;
};
const NewGuestlist: React.FC<NewGuestlistProps> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    notes: "",
    noOfTickets: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      notes: "",
      noOfTickets: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addGuest({ data: formData });
      toast.success("Guest added successfully!");
      handleClose();
      refetch();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add guest. Please try again.");
      }

      console.error("Error adding guest:", error);
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
        New Guestlist
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
          Add a guest
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
            <div className="grid gap-4">
              <TextField
                id="fname"
                name="fname"
                label="First Name"
                variant="outlined"
                type="text"
                fullWidth
                value={formData.fname}
                onChange={handleInputChange}
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

            {/* <div className="grid gap-4">
                <TextField
                  id="lname"
                  name="lname"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={formData.lname}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "56px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px",
                    },
                  }}
                />
              </div> */}

            <div className="grid gap-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
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
                id="noOfTickets"
                name="noOfTickets"
                label="Number of tickets"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.noOfTickets}
                onChange={handleInputChange}
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
                id="notes"
                name="notes"
                label="Notes"
                required
                multiline
                rows={2}
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-4 mt-4 ml-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center gap-4 bg-gray-100 text-black font-bold py-2 px-4 rounded"
              >
                BACK
              </button>
              <button
                type="submit"
                className="flex flex-row items-center justify-center gap-4 bg-[#244f7a] text-white font-bold py-2 px-4 rounded"
              >
                ADD
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewGuestlist;
