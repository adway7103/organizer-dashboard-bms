import CheckListCard from "./CheckListCard";
import CountComponent from "./CountComponent";
import EventCard from "./EventCard";
import img from "../../../../../public/event/heart.png";
import money from "../../../../../public/event/money.png";

interface CountComponentData {
  image: string;
  text: string;
  num: string;
}

const data: CountComponentData[] = [
  { image: img, text: "Interested People", num: "30%" },
  { image: money, text: "Revenue", num: "$1000" },
  { image: "", text: "Page view count", num: "2000" },
  { image: "", text: "Page view count", num: "2000" },
];

const EventOverview = () => {
  return (
    <>
      <div className="bg-[#f8f8f8] ml-8 mr-8 rounded-3xl">
        <div className="flex">
          <div className="pt-10 pl-10">
            <EventCard />
          </div>
          <div className="p-10">
            <CheckListCard />
          </div>
        </div>
        <div className="flex gap-6 p-2 ml-8 mr-8">
          {
            data.map((i,index) => (
              <CountComponent key={index} image={i.image} text={i.text} num={i.num}/>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default EventOverview;
