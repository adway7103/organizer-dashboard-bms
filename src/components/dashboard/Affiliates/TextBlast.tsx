import { useState } from "react";
import HomeContainerCard from "../HomeContainerCard";
// import { textBlast } from "../../../api/textBlastApi";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { textBlast } from "../../../api/textBlastApi";
import { EventTextBlast } from "../../../api/textBlastApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface Props {
  className?: string;
  heading?: string;
  classStyle?: string;
  event?: string;
}
const TextBlast = ({ className, heading, classStyle, event }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <HomeContainerCard
        className={`h-auto sm:h-[10vh] mt-4 shadow-none ${classStyle}`}
      >
        <div
          onClick={handleClickOpen}
          className={`flex h-16 justify-center items-center pl-4 text-[1rem] border border-gray-700 rounded-full text-white cursor-pointer ${className}`}
        >
          {heading}{" "}
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
              <SendComponent
                heading={"Send via Email"}
                type="email"
                closeParentDialog={handleClose}
                event={event}
              />
              <SendComponent
                heading={"Send via WhatsApp"}
                type="whatsapp"
                closeParentDialog={handleClose}
              />
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

interface SendComponentProps {
  heading: string;
  type: "email" | "whatsapp";
  closeParentDialog: () => void;
  event?: string;
}

const SendComponent = ({
  heading,
  type,
  closeParentDialog,
  event,
}: SendComponentProps) => {
  const { eventId } = useParams();

  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  // const [attendeesChecked, setAttendeesChecked] = useState(false);
  // const [followersChecked, setFollowersChecked] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customers = location.pathname.startsWith("/customers");
  const followers = location.pathname.startsWith("/followers");

  const endPoint = customers ? "customer" : followers ? "followers" : "";

  const handleSend = async () => {
    try {
      if (!subject || !description) {
        toast.error("Subject and description cannot be empty.");
        return;
      }

      if (type === "email") {
        if (!endPoint && eventId) {
          await EventTextBlast({ subject, description }, eventId);
          toast.success("Text Blast sent successfully");
        } else if (!eventId && event) {
          await EventTextBlast({ subject, description }, event);
          toast.success("Text Blast sent successfully");
        } else {
          await textBlast({ subject, description }, endPoint);
          toast.success("Text Blast sent successfully");
        }
      } else if (type === "whatsapp") {
        console.log("Sending WhatsApp:", { subject, description });
        toast.success("WhatsApp message sent successfully");
      }

      handleClose();
      closeParentDialog();
    } catch (error) {
      console.error("Error sending text blast:", error);
      toast.error("Failed to send the message. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <HomeContainerCard className="h-auto sm:h-[10vh] shadow-none">
        <div
          onClick={handleClickOpen}
          className={`bg-black text-white max-sm:text-xs px-2 sm:px-6 py-3 rounded-lg cursor-pointer`}
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
              {/* <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={attendeesChecked}
                    onChange={() => setAttendeesChecked(!attendeesChecked)}
                  />
                  Attendees
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={followersChecked}
                    onChange={() => setFollowersChecked(!followersChecked)}
                  />
                  Followers
                </label>
              </div> */}
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
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
