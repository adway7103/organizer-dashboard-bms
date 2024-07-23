import HomeContainerCard from "../HomeContainerCard";
import AffiliatePieChart from "../Affiliates/AffiliatePieChart";

interface PropsType {
  heading: string;
}
const Total = ({ heading }: PropsType) => {
  return (
    <HomeContainerCard className="h-auto border border-gray-300 rounded-3xl min-w-[300px] w-[300px] lg:w-auto xl:pr-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center">
          <AffiliatePieChart />
        </div>
        <div className="xl:pl-14 flex flex-col items-center pb-2 pr-2">
          <div className="p-6 font-semibold text-base md:text-xl">{heading}</div>
          <div className="text-xs md:text-sm">
            <div className="flex p-2 gap-4 items-center justify-between">
              <div className="">Logo</div>
              <div className="">WEFVWRFWE</div>
              <div className="">2,000</div>
            </div>
            <div className="flex p-2 gap-4  items-center justify-between">
              <div className="">Logo</div>
              <div className="">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
            <div className="flex p-2 gap-4  items-center justify-between">
              <div className="">Logo</div>
              <div className="">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
          </div>
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default Total;
