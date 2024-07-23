import EventGrid from "./Events/EventGrid";
import Total from "./Events/Total";

export const EventHome = () => {
  return (
    <div className="ml-8 min-w-[400px]">
        <h1 className="text-3xl font-semibold">Live Events</h1>
        <div className="flex fle-wrap flex-col md:flex-row lg:flex-col xl:flex-row lg:w-[500px] xl:w-auto gap-10 mt-6">
        <Total heading={"Total Revenue"}/>
        <Total heading={"Total tickets sold"}/>
        </div>
      <EventGrid />
    </div>
  );
};
