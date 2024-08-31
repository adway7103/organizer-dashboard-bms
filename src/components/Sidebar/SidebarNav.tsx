import { NavLink } from "react-router-dom";

interface SidebarNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
  imgSrc?: string;
}

interface SidebarNavProps {
  item: SidebarNavItem;
  onClick?: (e: any) => void;
  isActive?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ item, onClick, isActive }) => {
  const borderRadiusClass =
    item.name === "Ticket and Vouchers" ? "rounded-t-3xl" : "rounded-3xl";
  const navStyle = `flex items-center md:gap-x-4 px-4 sm:px-5 py-2 ${borderRadiusClass} ${
    isActive ? "active-sidebar" : ""
  }`;

  return (
    <NavLink
      to={item.link}
      onClick={onClick}
      className={({ isActive }) =>
        isActive ? `active-sidebar ${navStyle}` : navStyle
      }
    >
      {item.imgSrc ? (
        <img
          src={item.imgSrc}
          alt={item.name}
          className="sidebar-img w-6 h-5"
        />
      ) : (
        <span className="sidebar-navigations text-xl">{item.icon}</span>
      )}
      <span className="sidebar-navigations md:block hidden">{item.name}</span>
    </NavLink>
  );
};

export default SidebarNav;
