import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateEvent from "./CreateEvent";
import AddTicket from "./AddTicket";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEvent />} />
        <Route path="/add-tickets" element={<AddTicket />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
