import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateEvent from "./CreateEvent";
import AddTicket from "./AddTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEvent />} />
        <Route path="/add-tickets" element={<AddTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
