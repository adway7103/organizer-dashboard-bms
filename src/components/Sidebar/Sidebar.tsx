import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs, eventsTabSidebar } from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isVisible }: any) => {
  const location = useLocation();
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const currentNavs = location.pathname.startsWith("/events/")
    ? eventsTabSidebar
    : SidebarNavs;

  return (
    <div
      className={`sidebar ml-2 h-[90%] py-5 md:px-8 md:py-5 flex flex-col space-y-2 transition-transform duration-300 ease-in-out sm:w-[16vw] md:w-[260px] ${
        isVisible || window.innerWidth >= 768 ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {currentNavs.map((item, index) => {
        const isActive = location.pathname === item.link;
        const isAccordionTab = item.name === "Ticket and Vouchers";

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
            {isAccordionTab && isAccordionOpen && (
              <div className="bg-[#cbd0d6] rounded-b-3xl flex flex-col items-center gap-3 pt-3 pb-3 cursor-pointer">
                <Link to={"/events/tickets"}>Tickets</Link>
                <Link to={"/events/vouchers"}>Vouchers</Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
