import "./CreateEvent.css";
import { Outlet } from "react-router-dom";

const CreateEvent = () => {
  return (
    <section className="create-event md:w-1/2 w-full md:px-0 px-10 mx-auto pb-10">
      <Outlet />
    </section>
  );
};

export default CreateEvent;
