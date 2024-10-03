import EventForm from "./EventForm";

const CE_Page1 = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-8 p-1">
        <span className="page-top bg-black"></span>
        <span className="page-top bg-neutral-300"></span>
      </div>
      <h1 className="font-medium text-2xl pb-4">Create Event</h1>
      <EventForm />
    </>
  );
};

export default CE_Page1;
