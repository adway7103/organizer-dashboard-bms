import HomeContainerCard from "../HomeContainerCard";

const Data = [
  {
    title: "Affiliates",
    size: "300",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Customers",
    size: "5000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Views",
    size: "6000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Followers",
    size: "8000",
    percentage: "5%",
    days: "vs last 7 days",
  },
];



const Affilliates = () => {
  return (
    <HomeContainerCard className="h-[55vh]">
    <div className="grid grid-cols-2 pt-4 gap-3">
      {Data.map((item) => (
          <div className="border border-gray-300 rounded-2xl shadow-md">
          <div className="flex p-2 px-8 items-center">
            <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
            <p className="pl-6 ">{item.title}</p>
          </div>
          <div className="flex justify-center pl-4 text-[1.8rem] font-bold">
            {item.size}
          </div>
          <div className="flex p-4 px-12 items-center">
            <div className="text-xs  2xl:text-[0.7rem] px-1 py-1 bg-green-200 rounded-lg text-green-600">
              +{item.percentage}
            </div>
            <p className="text-xs pl-3">{item.days}</p>
          </div>
        </div>
      ))}
    </div>
    </HomeContainerCard>
  );
};

export default Affilliates;
