import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="p-2 flex">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default App;
