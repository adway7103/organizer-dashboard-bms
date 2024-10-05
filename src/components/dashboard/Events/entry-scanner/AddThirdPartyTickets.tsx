import { Dialog, DialogContent } from "@mui/material";
import HomeContainerCard from "../../HomeContainerCard";
import React, { useState } from "react";
import UploadThirdPartyTicket from "./UploadThirdPartyTickets";

const AddThirdPartyTicket = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          3rd party ticket
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
            <div className="text-xl font-medium">
              Entry scanner / Third party tickets
            </div>
            <div className="bg-[#f8f8f8] rounded-3xl p-4 mt-4">
              {" "}
              <h4 className="text-center font-medium text-sm mb-6 mt-2">
                upload tickets you've sold elsewhere
              </h4>
              <p className="text-xs">
                You can use the Kafsco Entry Manager app to scan in attendees
                who have bought tickets purchased outside the Kafsco platform
              </p>
            </div>
          </div>
        </DialogContent>
          <button
            className="flex justify-center items-center"
          >
            <UploadThirdPartyTicket handleFirstDialogClose={setOpen}/>
          </button>
      </Dialog>
    </React.Fragment>
  );
};

export default AddThirdPartyTicket;
