import HomeContainerCard from "../HomeContainerCard";
import img from "../../../../public/affiliates/count.png";

interface CountCardType {
  heading: string;
  count: string;
}

const CountCard = ({ heading, count }: CountCardType) => {
  return (
    <HomeContainerCard className="h-auto sm:h-[22vh] shadow-none border border-gray-300 rounded-3xl sm:flex justify-center sm:items-center">
      <div className="flex flex-row justify-around items-center sm:flex-col sm:justify-center sm:items-center gap-y-2">
        <div className="flex justify-center gap-x-4 items-center sm:gap-x-2">
          <div>
            <img
              src={img}
              alt=""
              className="border border-black rounded-full bg-[#d8d8d8] p-1"
            />
          </div>
          <div className="font-semibold text-xl">{heading}</div>
        </div>
        <div className="text-[2rem] font-bold ">{count}</div>
      </div>
    </HomeContainerCard>
  );
};

export default CountCard;
