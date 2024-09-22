import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import bg from "../public/background2.png";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    setIsManuallyToggled(true);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setSidebarVisible(true);
      setIsManuallyToggled(true);
    } else if (!isManuallyToggled) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isManuallyToggled]);

  const shouldHideNavAndSidebar = location.pathname === "/createanaccount";

  return (
    <div>
      <div className="home -z-10 fixed min-h-screen md:flex min-w-screen">
        <img src={bg} alt="" className="min-h-screen min-w-screen" />
      </div>
      {!shouldHideNavAndSidebar && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`${shouldHideNavAndSidebar ? "py-0" : "py-16"}`}>
        {!shouldHideNavAndSidebar && <Sidebar isVisible={isSidebarVisible} />}
        <main
          className={`transition-all duration-300 ${
            shouldHideNavAndSidebar
              ? "w-full"
              : isSidebarVisible
              ? "pl-[60px] sm:pl-[260px] pt-6"
              : "sm:pl-[20px] sm:pl-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
