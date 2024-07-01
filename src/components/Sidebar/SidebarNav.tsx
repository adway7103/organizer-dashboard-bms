import { Link } from "react-router-dom";

interface SidebarNavItem {
  link: string;
  icon: React.ReactNode;
  name: string;
}

interface SidebarNavProps {
  item: SidebarNavItem;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ item }) => {
  return (
    <Link to={item.link} className="flex items-center md:gap-3">
      <span className="text-xl">{item.icon}</span>
      <span className="md:block hidden">{item.name}</span>
    </Link>
  );
}

export default SidebarNav;
