import { Dialog, DialogContent, TextField } from "@mui/material";
import HomeContainerCard from "../../HomeContainerCard";
import React, { useState } from "react";
import { generateScannerCode } from "../../../../api/generateScannerCodeApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AddNewEntryCode = ({}) => {
  const { eventId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generateScannerCode({ description, eventId });
      toast.success("Scanner-Code generated successfully!");
      handleClose();
      // refetch();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to generate code. Please try again.");
      }
    }
  };

  return (
    <React.Fragment>
      <HomeContainerCard className="h-auto sm:h-[10vh] shadow-none">
        <button
          onClick={handleClickOpen}
          className="bg-[#d3c282] max-sm:text-xs px-2 mt-6 sm:px-10 py-2 rounded-full flex items-center gap-2"
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
          Add new entry code
        </button>
      </HomeContainerCard>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "30px",
            padding: "2rem",
          },
        }}
      >
        <DialogContent>
          <div>
            <div className="text-xl font-medium">Code description</div>
            <h4 className="text-sm mb-6 mt-2">
              Add your code description for example: XxXXxXX
            </h4>
            <div className="space-y-6">
              <div>
                <TextField
                  id="code"
                  name="code"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiInputBase-root": {
                      height: "56px",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "16px",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <div className="flex gap-4 ml-6 mb-4 mt-2">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg "
            onClick={handleClose}
          >
            CANCEL
          </button>
          <button
            className="bg-[#244f7a] text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            GENERATE CODE
          </button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AddNewEntryCode;
