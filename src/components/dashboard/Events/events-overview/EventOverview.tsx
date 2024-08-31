import CheckListCard from "./CheckListCard";
import CountComponent from "./CountComponent";
import EventCard from "./EventCard";
import img from "../../../../../public/event/heart.png";
import money from "../../../../../public/event/money.png";
import TextBlast from "../../Affiliates/TextBlast";
import { TicketTable } from "./TicketsTable";
import { RecentOrdersTable } from "./RecentOrderTable";

interface CountComponentData {
  image: string;
  text: string;
  num: string;
}

const data: CountComponentData[] = [
  { image: "", text: "Total tickets sold", num: "2000" },
  { image: img, text: "Interested People", num: "30%" },
  { image: money, text: "Revenue", num: "$1000" },
  { image: "", text: "Page view count", num: "2000" },
];

const EventOverview = () => {
  return (
    <>
      <div className="bg-[#f8f8f8] sm:ml-8 ml-2 mr-0 2xl:mr-8 rounded-3xl min-w-[300px]">
        <div className="xl:flex">
          <div className="pt-10 pl-2 max-sm:pr-2 lg:pl-10">
            <EventCard />
          </div>
          <div className="max-sm:pl-4 max-sm:mt-4 p-2 lg:p-10 pr-2">
            <CheckListCard />
          </div>
        </div>
        <div className="flex flex-wrap max-sm:mt-4 gap-6 p-2 ml-8 mr-8">
          {data.map((i, index) => (
            <CountComponent
              key={index}
              image={i.image}
              text={i.text}
              num={i.num}
            />
          ))}
        </div>
        <div className="grid min-w-[300px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ml-8 mr-28 mt-4">
          <TextBlast className="bg-[#954b7c]" />
          <TextBlast className="bg-[#6076a0]" heading="Event traffic" />
          <TextBlast
            className="bg-[#6076a0]"
            heading="View participant discussion"
          />
          <TextBlast className="bg-[#6076a0] text-xl" heading="Share" />
        </div>
        <div className="ml-8 mr-28 mt-8 sm:mt-4">
          <TrackEventComponent />
        </div>
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Tickets</h1>
          <TicketTable />
        </div>
        <div className="sm:ml-8 sm:mr-24 mt-12">
          <h1 className="text-2xl font-medium ml-8">Recent Orders</h1>
          <RecentOrdersTable />
        </div>
      </div>
    </>
  );
};

export default EventOverview;

const TrackEventComponent = () => {
  return (
    <div className="flex grid grid-cols-5 min-w-[300px]">
      <div
        className={`col-span-1 flex justify-center items-center h-16 pl-4 text-[1rem] border border-gray-700 bg-[#6076a0] rounded-l-full text-white`}
      >
        Track event
      </div>
      <div
        className={`col-span-4 flex justify-between items-center h-16 text-[1rem] border border-gray-700 bg-[#eaebef] rounded-r-full text-black`}
      >
        <div className="ml-16">Track event</div>
        <div className="mr-6">copy</div>
      </div>
    </div>
  );
};
