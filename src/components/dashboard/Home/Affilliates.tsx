import HomeContainerCard from "../HomeContainerCard";

const Data = [
  {
    title: "Affiliates",
    count: "300",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Customers",
    count: "5000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Views",
    count: "6000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Followers",
    count: "8000",
    percentage: "5%",
    days: "vs last 7 days",
  },
];

const Affilliates = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Data.map((item, index) => (
        <HomeContainerCard
          key={index}
          className="border border-gray-300 rounded-2xl shadow-md  h-[27vh]"
        >
          <div className="flex pt-4 justify-center items-center">
            <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
            <p className="pl-6">{item.title}</p>
          </div>
          <div className="flex justify-center items-center text-[1.8rem] font-bold">
            {item.count}
          </div>
          <div className="flex xl:p-2 justify-center items-center">
            <div className="text-xs sm:text-sm md:text-[0.7rem] lg:text-[0.7rem] px-1 py-1 bg-green-200 rounded-lg text-green-600">
              +{item.percentage}
            </div>
            <p className="text-xs md:text-[0.8rem] lg:text-xs pl-3">
              {item.days}
            </p>
          </div>
        </HomeContainerCard>
      ))}
    </div>
  );
};

export default Affilliates;
