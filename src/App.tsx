import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isManuallyToggled, setIsManuallyToggled] = useState(false);

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

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="p-2 py-16">
        <Sidebar isVisible={isSidebarVisible} />
        <main
          className={`transition-all duration-300 ${
            isSidebarVisible ? "pl-[70px] sm:pl-[220px]" : "pl-[20px] sm:pl-0"
          } sm:pl-[50px] md:pl-[220px]`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
