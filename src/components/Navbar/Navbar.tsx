import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="fixed left-0 w-full z-50 flex items-center justify-between pl-5 pr-7 py-3 bg-white">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Organizer Logo"
            className="w-10 h-10 mr-4 rounded-full"
          />
        </Link>
        <span className="text-xl text-black font-semibold">ORGANIZER</span>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <img src="/Group.png" />
        <button
          type="button"
          className="inline-flex items-center px-4 py-1 border border-gray-600 rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <img src="/user.png" className="pr-2" />
          profile
        </button>
        <div className="relative">
          <Link
            to="/create-events"
            className="btn inline-flex items-center px-4 py-1 text-white  rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            CREATE EVENT
          </Link>
        </div>
      </div>
      <div className="md:hidden flex items-center space-x-2">
        <Link
          to="/create-events"
          className="btn inline-flex items-center px-4 py-1 text-white  rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          CREATE EVENT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
