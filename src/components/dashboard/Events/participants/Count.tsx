import HomeContainerCard from "../../HomeContainerCard";
import img from "../../../../../public/affiliates/Commission.png";

interface TotalCommisionProps {
  count?: number;
}
const TotalCommision = ({ count }: TotalCommisionProps) => {
  return (
    <HomeContainerCard className="h-auto md:h-[36vh] shadow-none border border-gray-300 rounded-3xl sm:flex justify-center sm:items-center">
      <div className="flex flex-row justify-around items-center sm:flex-col sm:justify-center sm:items-center gap-y-2 p-4 xl:gap-y-2 xl:p-12">
        <div className="flex flex-row sm:flex-col justify-center items-center gap-2 sm:gap-0 gap-y-1 xl:gap-y-2">
          <div>
            <img
              src={img}
              alt=""
              className="border border-black rounded-full bg-[#d8d8d8] p-1"
            />
          </div>
          <div className="text-lg sm:text-xl text-center">
            Number of people who bought tickets
          </div>
        </div>
        <div className="text-[1.6rem] sm:text-[2rem] font-semibold">
          {count}
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default TotalCommision;
