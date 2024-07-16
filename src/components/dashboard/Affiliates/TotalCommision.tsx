import HomeContainerCard from "../HomeContainerCard";

const TotalCommision = () => {
  return (
    <HomeContainerCard className="h-auto md:h-[34vh] shadow-none border border-gray-300 rounded-3xl">
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="h-10 w-10 rounded-full bg-yellow-500 border border-gray-950"></div>
        <div className="py-4">
          <p className="font-semibold text-xl ">Total Commission earned</p>
        </div>
        <div className="text-[1.8rem] font-bold">5000</div>
      </div>
    </HomeContainerCard>
  );
};

export default TotalCommision;
