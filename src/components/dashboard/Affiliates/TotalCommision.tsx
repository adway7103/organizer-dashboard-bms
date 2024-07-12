import HomeContainerCard from "../HomeContainerCard";

const TotalCommision = () => {
  return (
    <HomeContainerCard className="h-[34vh] shadow-none border border-gray-300 rounded-3xl">
      <div className="flex flex-col items-center m-6 py-4">
        <div className="h-10 w-10 rounded-full bg-yellow-500 border border-gray-950"></div>
        <div className="py-2">
          <p className="font-semibold text-xl">Total Commission earned</p>
        </div>
        <div className="text-[1.8rem] font-bold">5000</div>
      </div>
    </HomeContainerCard>
  );
};

export default TotalCommision;
