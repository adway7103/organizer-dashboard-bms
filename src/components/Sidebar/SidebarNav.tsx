import { NavLink } from "react-router-dom";

interface SidebarNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
  imgSrc?: string;
}

interface SidebarNavProps {
  item: SidebarNavItem;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ item, isActive, onClick }) => {
  const borderRadiusClass =
    item.name === "Ticket and Vouchers" || item.name === "Events"
      ? "rounded-t-3xl py-3"
      : "rounded-3xl";
  const navStyle = `flex items-center md:gap-x-4 px-4 sm:px-5 py-2 cursor-pointer ${borderRadiusClass} ${
    isActive ? "active-sidebar" : ""
  }`;

  return (
    <div onClick={onClick}>
      {item.name === "Ticket and Vouchers" || item.name === "Events" ? (
        <div className={navStyle}>
          {item.imgSrc ? (
            <img
              src={item.imgSrc}
              alt={item.name}
              className="sidebar-img size-7"
            />
          ) : (
            <span className="sidebar-navigations text-xl">{item.icon}</span>
          )}
          <span className="sidebar-navigations md:block hidden">
            {item.name}
          </span>
        </div>
      ) : (
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            isActive ? `active-sidebar ${navStyle}` : navStyle
          }
        >
          {item.imgSrc ? (
            <img
              src={item.imgSrc}
              alt={item.name}
              className="sidebar-img"
            />
          ) : (
            <span className="sidebar-navigations text-xl">{item.icon}</span>
          )}
          <span className="sidebar-navigations md:block hidden">
            {item.name}
          </span>
        </NavLink>
      )}
    </div>
  );
};

export default SidebarNav;
