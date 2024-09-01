import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs, eventsTabSidebar } from "../../utils/Constant";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = ({ isVisible }: any) => {
  const location = useLocation();

  // Determine which set of nav items to show based on the current route
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
        const isActive = item.name === "Ticket and Vouchers" && location.pathname === item.link;

        return (
          <div key={index}>
            <SidebarNav
              item={item}
              key={index}
              isActive={isActive}
            />
            {item.name === "Ticket and Vouchers" && isActive && (
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
