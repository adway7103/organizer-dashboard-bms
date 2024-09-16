import { useState } from "react";
import HomeContainerCard from "../HomeContainerCard";
// import { textBlast } from "../../../api/textBlastApi";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  className?: string;
  heading?: string;
}
const TextBlast = ({ className, heading }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <HomeContainerCard className="h-auto sm:h-[10vh] mt-4 shadow-none">
        <div
          onClick={handleClickOpen}
          className={`flex h-16 justify-center items-center pl-4 text-[1rem] border border-gray-700 rounded-full text-white cursor-pointer ${className}`}
        >
          {heading ? heading : "Send A Text Blast"}{" "}
        </div>
      </HomeContainerCard>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "30px",
            padding: "2rem",
          },
        }}
      >
        <DialogContent>
          <div>
            <div className="text-xl font-medium mb-6">Text Blast</div>
            <div className="flex gap-1 sm:gap-6 max-sm:text-xs justify-center items-center">
              <SendComponent heading={"Send via Email"} />
              <SendComponent heading={"Send via whatsapp"} />
            </div>
          </div>
        </DialogContent>
        <div className="ml-6 mb-4">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg max-sm:text-xs"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default TextBlast;

const SendComponent = ({ heading }: any) => {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  console.log(subject, description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <HomeContainerCard className="h-auto sm:h-[10vh] shadow-none">
        <div
          onClick={handleClickOpen}
          className={`bg-black text-white max-sm:text-xs px-2 sm:px-6 py-3 rounded-lg`}
        >
          {heading ? heading : ""}{" "}
        </div>
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
            <div className="text-xl font-medium mb-6">Create new message</div>
            <div className="space-y-6">
              <div>
                <TextField
                  id="eventName"
                  name="title"
                  label="Text message subject"
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Increase the border-radius
                      border: "1px solid gray", // Thicker and darker border
                      "& fieldset": {
                        borderColor: "gray", // Border color
                      },
                      "&:hover fieldset": {
                        borderColor: "black", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black", // Border color when focused
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
              <div>
                <TextField
                  id="description"
                  name="description"
                  label="Text message"
                  fullWidth
                  required
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px", // Increase the border-radius
                      border: "1px solid gray", // Thicker and darker border
                      "& fieldset": {
                        borderColor: "gray", // Border color
                      },
                      "&:hover fieldset": {
                        borderColor: "black", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black", // Border color when focused
                      },
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
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={handleClose}
          >
            Send
          </button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
