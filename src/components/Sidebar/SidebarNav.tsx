import { NavLink } from "react-router-dom";

interface SidebarNavItem {
  link: string;
  icon: React.ReactNode;
  name: string;
}

interface SidebarNavProps {
  item: SidebarNavItem;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ item }) => {
  const navStyle = "flex items-center md:gap-x-2 px-5 py-2"
  return (
    <NavLink to={item.link} className={({isActive})=> isActive ? `active-sidebar ${navStyle}` : navStyle}>
      <span className="sidebar-navigations text-xl">{item.icon}</span>
      <span className="sidebar-navigations md:block hidden">{item.name}</span>
    </NavLink>
  );
}

export default SidebarNav;
