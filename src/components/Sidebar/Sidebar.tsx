import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs } from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import Group from "../../../public/sidebar/Group.png";
import Ticket from "../../../public/sidebar/Ticket.png";
import { PiTicketFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ isVisible }: any) => {
  const location = useLocation();
  const { eventId } = useParams<{ eventId: string }>();
  const [isAccordionOpen, setAccordionOpen] = useState(false);

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

  useEffect(() => {
    setAccordionOpen(false);
  }, [baseEventUrl]);

  const eventsTabSidebar = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      link: "/dashboard",
    },
    {
      name: "Event Overview",
      imgSrc: Group, // Using imgSrc for custom image
      link: `${baseEventUrl}/event-overview/${eventId}`,
    },
    {
      name: "Ticket and Vouchers",
      imgSrc: Ticket,
      link: `/events/tickets`,
    },
    {
      name: "Participants",
      icon: <BsPeople />,
      link: `${baseEventUrl}/participants/${eventId}`,
    },
    // {
    //   name: "Affiliation",
    //   icon: <LuNetwork />,
    //   link: "/affiliation",
    // },
    {
      name: "Sales",
      icon: <PiTicketFill />,
      link: `${baseEventUrl}/sales/${eventId}`,
    },
    {
      name: "Logout",
      icon: <IoLogOutOutline />,
      link: "/logout",
    },
  ];

  const currentNavs = baseEventUrl ? eventsTabSidebar : SidebarNavs;

  return (
    <div
      className={`sidebar ml-2 h-[90%] py-5 md:px-8 md:py-5 flex flex-col space-y-2 transition-transform duration-300 ease-in-out sm:w-[16vw] md:w-[260px] mt-3 ${
        isVisible || window.innerWidth >= 768
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      {currentNavs.map((item, index) => {
        const isActive = location.pathname === item.link;
        const isAccordionTab =
          item.name === "Ticket and Vouchers" || item.name === "Events";

        return (
          <div key={index}>
            <SidebarNav
              item={item}
              key={index}
              isActive={isAccordionTab ? isAccordionOpen : isActive}
              onClick={() => {
                if (isAccordionTab) setAccordionOpen(!isAccordionOpen);
              }}
            />
            {item.name === "Ticket and Vouchers" && isAccordionOpen && (
              <div className="bg-[#cbd0d6] rounded-b-3xl flex flex-col items-center gap-3 pt-3 pb-3 cursor-pointer">
                <Link to={`${baseEventUrl}/tickets/${eventId}`}>Tickets</Link>
                <Link to={`${baseEventUrl}/vouchers/${eventId}`}>Vouchers</Link>
              </div>
            )}
            {item.name === "Events" && isAccordionOpen && (
              <div className="bg-[#cbd0d6] rounded-b-3xl flex flex-col pl-1.5 sm:pl-6 md:pl-14 gap-3 pt-3 pb-3 cursor-pointer ">
                <Link to={`drafted-events`}>Drafts</Link>
                <Link to={`live-events`}>Live</Link>
                <Link to={`past-events`}>Past</Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
