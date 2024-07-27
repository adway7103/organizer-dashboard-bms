import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs } from "../../utils/Constant";
const Sidebar = ({ isVisible }: any) => {
  return (
    <div
      className={`sidebar h-[90%] py-5 md:px-8 md:py-5 flex flex-col space-y-2 transition-transform duration-300 ease-in-out ${
        isVisible || window.innerWidth >= 768
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      {SidebarNavs.map((item, index) => {
        return <SidebarNav item={item} key={index} />;
      })}
    </div>
  );
};

export default Sidebar;
