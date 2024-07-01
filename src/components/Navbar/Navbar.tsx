import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed left-0 w-full z-50 flex items-center justify-between pl-5 pr-12 py-3 bg-white">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="logo.png"
            alt="Organizer Logo"
            className="w-10 h-10 mr-4 rounded-full"
          />
        </Link>
        <span className="text-xl text-black font-semibold">ORGANIZER</span>
      </div>
      <div className="flex items-center space-x-4">
        <img src="/Group.png" />
        <button
          type="button"
          className="inline-flex items-center px-4 py-1 border border-gray-600 rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <img src="/user.png" className="pr-2" />
          profile
        </button>
        <div className="relative">
          <button
            type="button"
            className="btn inline-flex items-center px-4 py-1 text-white border border-gray-600 rounded-2xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            CREATE EVENT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
