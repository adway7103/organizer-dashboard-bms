import { Link } from "react-router-dom";
const Navbar = ({ toggleSidebar }: any) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between pr-7 py-3 bg-white min-w-[300px] pl-4">
      <div onClick={toggleSidebar} className="block sm:hidden pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </div>
      <div className="flex items-center">
        <a href="https://www.kafsco.com" target="blank"  rel="noopener noreferrer">
          <div className="size-10 w-full flex">
            <img
              src="../kafsco.icon.jpeg"
              alt="Organizer Logo"
              className="hidden sm:block"
            />
          </div>
        </a>
        <span className="text-xl text-black font-semibold hidden sm:block">
          ORGANIZER
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <img src="/Group.png" />
        <Link to={"/profile"}>
          <button
            type="button"
            className="inline-flex items-center px-4 py-1 border border-gray-600 rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <img src="/user.png" className="pr-2" />
            profile
          </button>
        </Link>
        <div className="relative">
          <Link
            to="/create-events"
            className="btn inline-flex items-center px-4 py-1 text-white  rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            CREATE EVENT
          </Link>
        </div>
      </div>
      <div className="md:hidden flex items-center space-x-2">
        <Link
          to="/create-events"
          className="btn inline-flex items-center px-4 py-1 text-white  rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          CREATE EVENT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
