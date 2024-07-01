import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      
      <main className="p-2 py-16 flex">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
