import { Dialog, DialogContent } from "@mui/material";
import HomeContainerCard from "../../HomeContainerCard";
import React, { useState } from "react";

import FileDragNDrop from "./DragAndDropCsv";

const UploadThirdPartyTicket = ({
  handleFirstDialogClose,
}: {
  handleFirstDialogClose: any;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleFirstDialogClose(false);
  };

  return (
    <React.Fragment>
      <HomeContainerCard className="h-auto sm:h-[10vh] shadow-none">
        <button
          onClick={handleClickOpen}
          className="bg-[#244f7a] text-white max-sm:text-xs px-2 sm:px-10 py-2 rounded flex items-center gap-2"
        >
          UPLOAD THIRD PARTY TICKETS{" "}
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
            <div className="text-lg font-medium">Upload your tickets </div>{" "}
            <p className="text-xs">
              If you have sold tickets on another paltform - you can import
              those tickets in the Kafsco system. There tickets will be scanned
              by the Entry Manager app
            </p>
          </div>
          <div className="flex justify-center items-center border-2 font-medium mt-4 text-sm sm:text-xl p-2 rounded-2xl">
            DOWNLOAD CSV TEMPLATE
          </div>

          <div>
            <FileDragNDrop />
          </div>
        </DialogContent>

        <div className="flex justify-center items-center gap-4 ml-6 mb-4 mt-2">
          <button
            className="sm:w-48 bg-gray-300 text-black max-sm:text-xs px-4 py-2 rounded-lg"
            onClick={handleClose}
          >
            BACK
          </button>
          <button className="sm:w-48 bg-[#244f7a] text-white max-sm:text-xs px-4 py-2 rounded-lg">
            UPLOAD TICKETS
          </button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default UploadThirdPartyTicket;
