import "./Sidebar.css";
import SidebarNav from "./SidebarNav";
import { SidebarNavs } from "../../utils/Constant";
const Sidebar = () => {
  return (
    <div className="sidebar px-8 py-5 flex flex-col gap-y-4 gap-3">
        {
            SidebarNavs.map((item, index) => {
                return (
                  <SidebarNav item={item} key={index} />
                )
            })
        }
    </div>
  )
}

export default Sidebar