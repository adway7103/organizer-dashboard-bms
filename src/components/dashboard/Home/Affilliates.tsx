import HomeContainerCard from "../HomeContainerCard";
import img from "../../../../public/affiliates/count.png";

const Data = [
  {
    title: "Affiliates",
    icon:img,
    count: "300",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Customers",
    icon:img,
    count: "5000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Views",
    icon:img,
    count: "6000",
    percentage: "5%",
    days: "vs last 7 days",
  },
  {
    title: "Followers",
    icon:img,
    count: "8000",
    percentage: "5%",
    days: "vs last 7 days",
  },
];

const Affilliates = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {Data.map((item, index) => (
        <HomeContainerCard
          key={index}
          className="border border-gray-300 rounded-2xl shadow-md h-auto sm:h-[27vh] sm:flex sm:justify-center sm:items-center"
        >
          <div className="flex sm:flex-col justify-between sm:justify-center items-center pl-8 pr-8 sm:pl-0 sm:pr-0">
            <div className="flex flex-col justify-center items-center">
              <div className="flex sm:justify-center sm:items-center sm:gap-4">
                <div className="hidden sm:block border rounded-full bg-yellow-400 p-2"><img src={item.icon} alt="" /></div>
                <p className="">{item.title}</p>
              </div>
              <div className="text-[1.8rem] font-bold">{item.count}</div>{" "}
            </div>
            <div className="flex xl:p-2 justify-center items-center pt-6 sm:pt-0">
              <div className="text-xs sm:text-sm md:text-[0.7rem] lg:text-[0.7rem] px-1 py-1 bg-green-200 rounded-lg text-green-600">
                +{item.percentage}
              </div>
              <p className="text-xs md:text-[0.8rem] lg:text-xs pl-3">
                {item.days}
              </p>
            </div>
          </div>
        </HomeContainerCard>
      ))}
    </div>
  );
};

export default Affilliates;
