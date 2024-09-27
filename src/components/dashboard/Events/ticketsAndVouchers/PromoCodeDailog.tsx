import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../../../utils";


interface Props {
  id: string;
  eventId?: string;
  onDelete: (id: string) => void;
}
export default function PromoCodeDialog({ id, eventId, onDelete }: Props) {
  console.log(eventId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const isLiveEvent = location.pathname.startsWith("/live-events/");
  //   const isPastEvent = location.pathname.startsWith("/past-events/");
  //   const isDraftEvent = location.pathname.startsWith("/drafted-events/");

  //   const baseEventUrl = isLiveEvent
  //     ? "/live-events"
  //     : isPastEvent
  //     ? "/past-events"
  //     : isDraftEvent
  //     ? "/drafted-events"
  //     : "";

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        `https://${baseUrl}/api/v1/promo-code/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onDelete(id);
      handleClose();
      toast.success("Promo-Code deleted");
      return response.data;
    } catch (error) {
      console.error("Error deleting code:", error);
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
        {/* <Link to={`#`} state={{ from: location.pathname }}>
          <MenuItem>Activate</MenuItem>
        </Link> */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
