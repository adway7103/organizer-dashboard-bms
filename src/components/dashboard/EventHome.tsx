import EventGrid from "./Events/EventGrid";
import Total from "./Events/Total";

export const EventHome = () => {
  return (
    <div className="sm:ml-8 sm:mr-16 min-w-[300px]">
      <h1 className="text-3xl font-semibold">Live Events</h1>
      <div className="flex flex-col md:flex-row lg:w-auto xl:w-auto gap-6 mt-6">
        <Total heading={"Total Revenue"} />
        <Total heading={"Total tickets sold"} />
      </div>
      <EventGrid />
    </div>
  );
};
