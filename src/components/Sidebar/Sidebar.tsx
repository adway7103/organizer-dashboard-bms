import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs } from "../../utils/Constant";
import { eventsTabSidebar } from "../../utils/Constant";
import { useState } from "react";
import { Link } from "react-router-dom";
interface SidebarNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode; 
  imgSrc?: string;      
}


const Sidebar = ({ isVisible }: any) => {
  const [currentNavs, setCurrentNavs] = useState<SidebarNavItem[]>(SidebarNavs);
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const handleEventsClick = () => {
    setCurrentNavs(eventsTabSidebar);
    setAccordionOpen(false);
  };

  const handleBackClick = () => {
    setCurrentNavs(SidebarNavs);
    setAccordionOpen(false);
  };

  const handleAccordionToggle = () => {
    // setAccordionOpen((prev) => !prev);
    setAccordionOpen(true);
  };

  const handleGenericClick = () => {
    setAccordionOpen(false);
  };

  return (
    <div
      className={`sidebar ml-2 h-[90%] py-5 md:px-8 md:py-5 flex flex-col space-y-2 transition-transform duration-300 ease-in-out sm:w-[16vw] md:w-[260px]  ${
        isVisible || window.innerWidth >= 768
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      {currentNavs.map((item, index) => {
        let onClickHandler;

        if (item.name === "Events") {
          onClickHandler = handleEventsClick;
        } else if (item.name === "Dashboard") {
          onClickHandler = handleBackClick;
        } else if (item.name === "Ticket and Vouchers") {
          onClickHandler = handleAccordionToggle;
        } else {
          onClickHandler = handleGenericClick;
        }

        const isActive = item.name === "Ticket and Vouchers" && isAccordionOpen;

        return (
          <div key={index}>
            <SidebarNav
              item={item}
              key={index}
              onClick={onClickHandler}
              isActive={isActive}
            />
            {item.name === "Ticket and Vouchers" && isAccordionOpen && (
              <div className="bg-[#cbd0d6] rounded-b-3xl flex flex-col items-center gap-3 pt-3 pb-3">
                <Link to={"events/tickets"}>Tickets</Link>
                <Link to={"events/vouchers"}>Vouchers</Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
