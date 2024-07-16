import HomeContainerCard from "../HomeContainerCard";

interface PropsType {
  heading: string;
}
const Total = ({ heading }: PropsType) => {
  return (
    <HomeContainerCard className="h-auto md:h-[25vh] border border-gray-300 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="place-self-center">pie chart</div>
        <div className="flex flex-col justify-center items-center ">
          <div className="p-2 xl:p-4 font-semibold text-base md:text-xl">{heading}</div>
          <div className="text-xs md:text-sm">
            <div className="flex p-1 gap-4 items-center justify-between">
              <div className="">Logo</div>
              <div className="">WEFVWRFWE</div>
              <div className="">2,000</div>
            </div>
            <div className="flex p-1 items-center justify-between">
              <div className="">Logo</div>
              <div className="">WEFVWRFWE</div>
              <div>2,000</div>
            </div>
            <div className="flex p-1 items-center justify-between">
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
