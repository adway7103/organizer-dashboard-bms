import HomeContainerCard from "../HomeContainerCard";

interface PropsType {
  heading: string;
}
const TotalRevenue = ({ heading }: PropsType) => {
  return (
    <HomeContainerCard className="h-[25vh] border border-gray-300 rounded-3xl ml-4">
      <div className="grid grid-cols-2">
        <div>pie chart</div>
        <div className="flex flex-col items-center ">
          <div className="p-4 font-semibold text-xl">{heading}</div>
          <div>
            <div className="flex p-1">
              <div className="pr-1">Logo</div>
              <div className="pl-1 pr-8">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
            <div className="flex p-1">
              <div className="pr-1">Logo</div>
              <div className="pl-1 pr-8">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
            <div className="flex p-1">
              <div className="pr-1">Logo</div>
              <div className="pl-1 pr-8">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
          </div>
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default TotalRevenue;
