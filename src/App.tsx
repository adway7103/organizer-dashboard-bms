import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <div className="p-2 py-16">
        <Sidebar />
        <main className="pl-[90px] md:pl-[220px]">
        <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
