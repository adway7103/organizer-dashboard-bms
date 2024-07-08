import "./CreateEvent.css";
import EventForm from "./EventForm";
import { Outlet } from "react-router-dom";

const CreateEvent = () => {
  return (
    <section className="create-event w-1/2 px-10 pb-10  max-h-screen">
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-neutral-300"></span>
      </div>
      <h1 className="font-semibold text-2xl pb-4">Create Event</h1>
      <Outlet />
    </section>
  );
};

export default CreateEvent;
