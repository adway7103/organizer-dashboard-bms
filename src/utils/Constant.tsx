import { IoLogOutOutline } from "react-icons/io5"; //IoEyeOutline,
import { RiUserSettingsFill } from "react-icons/ri"; //RiCustomerService2Line
import { SlCalender } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";
import { GiMoneyStack } from "react-icons/gi";
import { LuNetwork } from "react-icons/lu";
import { HiUserGroup } from "react-icons/hi2";
import { PiUsersFourLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import Group from "../../public/sidebar/Group.png";
import Ticket from "../../public/sidebar/Ticket.png";
import { PiTicketFill } from "react-icons/pi";

export const SidebarNavs = [
  // {
  //     name: "Overview",
  //     icon: <IoEyeOutline />,
  //     link: "/overview",
  // },
  {
    name: "Profile",
    icon: <RiUserSettingsFill />,
    link: "/profile",
  },
  {
    name: "Events",
    icon: <SlCalender />,
    link: "/events",
  },
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    link: "/dashboard",
  },
  {
    name: "Payouts",
    icon: <GiMoneyStack />,
    link: "payouts",
  },
  {
    name: "Affiliate",
    icon: <LuNetwork />,
    link: "/affiliate",
  },
  {
    name: "Followers",
    icon: <HiUserGroup />,
    link: "/followers",
  },
  {
    name: "Customers",
    icon: <PiUsersFourLight />,
    link: "/customers",
  },
  // {
  //     name: "Marketing",
  //     icon: <FaBullhorn />,
  //     link: "/marketing",
  // },
  // {
  //     name: "Messaging",
  //     icon: <MdMessage />,
  //     link: "/messaging",
  // },
  // {
  //     name: "Help",
  //     icon: <RiCustomerService2Line />,
  //     link: "/help",
  // },
  {
    name: "Logout",
    icon: <IoLogOutOutline />,
    link: "/logout",
  },
];
export const eventsTabSidebar = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    link: "/dashboard",
  },
  {
    name: "Event Overview",
    imgSrc: Group, // Using imgSrc for custom image
    link: "/events/event-overview",
  },
  {
    name: "Ticket and Vouchers",
    imgSrc: Ticket,
    link: "/events/tickets",
  },
  {
    name: "Participants",
    icon: <BsPeople />,
    link: "/participants",
  },
  {
    name: "Affiliation",
    icon: <LuNetwork />,
    link: "/affiliation",
  },
  {
    name: "Sales",
    icon: <PiTicketFill />,
    link: "/sales",
  },
  {
    name: "Logout",
    icon: <IoLogOutOutline />,
    link: "/logout",
  },
];

export const tagsOptions = [
  {
    title: "Music",
  },
  {
    title: "Movie",
  },
  {
    title: "Sports",
  },
  {
    title: "Arts",
  },
  {
    title: "Theatre",
  },
  {
    title: "Health",
  },
  {
    title: "Food & Drinks",
  },
  {
    title: "Seminars",
  },
  {
    title: "Comedy",
  },
  {
    title: "Business",
  },
  {
    title: "Workshops",
  },
  {
    title: "Concert",
  },
  {
    title: "Party",
  },
];
