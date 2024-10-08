import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import axios from "axios";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  matrixId?: string;
  eventId?: string;
  onDelete: (id: string) => void;
}
export default function GuestListDialog({
  id,
  matrixId,
  eventId,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLiveEvent = location.pathname.startsWith("/live-events/");
  const isPastEvent = location.pathname.startsWith("/past-events/");
  const isDraftEvent = location.pathname.startsWith("/drafted-events/");

  const baseEventUrl = isLiveEvent
    ? "/live-events"
    : isPastEvent
    ? "/past-events"
    : isDraftEvent
    ? "/drafted-events"
    : "";

  const handleDelete = async () => {
    // const token = localStorage.getItem("accessToken");
    try {
      //   const response = await axios.delete(
      //     `https://${baseUrl}/api/v1/bookingmatrix/delete-ticket/${matrixId}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       },
      //       data: {
      //         ticketId: id,
      //       },
      //     }
      //   );
      console.log("guest deleted");

      onDelete(id);
      handleClose();
      // return response.data;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      throw error;
    }
  };

  return (
    <div>
      <button
        id="demo-positioned-button"
        // aria-controls={open ? "demo-positioned-menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 20,
          horizontal: 10,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#fffeff",
          },
        }}
      >
        <Link
          to={`${baseEventUrl}/edit-ticket/${eventId}/${matrixId}/${id}`}
          state={{ from: location.pathname }}
        >
          <MenuItem>Edit guestlist</MenuItem>
        </Link>

        <MenuItem onClick={handleDelete}>Delete guestlist</MenuItem>
      </Menu>
    </div>
  );
}
