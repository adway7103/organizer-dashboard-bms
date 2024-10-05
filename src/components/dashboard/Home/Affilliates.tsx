import HomeContainerCard from "../HomeContainerCard";
import img from "../../../../public/affiliates/count.png";
import customerImg from "../../../../public/dashboard/customer.png";
import eyeImg from "../../../../public/dashboard/Eye.png";
import folllowerImg from "../../../../public/dashboard/follower.png";

interface AffilliatesProps {
  Affiliates?: string;
  Customers?: number;
  Views?: number;
  Followers?: number;
}

const Affilliates = ({
  Affiliates,
  Customers,
  Views,
  Followers,
}: AffilliatesProps) => {
  const Data = [
    {
      title: "Affiliates",
      icon: img,
      count: Affiliates,
      percentage: "5%",
      // days: "vs last 7 days",
      bgColor: "#eeca03",
    },
    {
      title: "Customers",
      icon: customerImg,
      count: Customers,
      percentage: "5%",
      // days: "vs last 7 days",
      bgColor: "#c0b6f0",
    },
    {
      title: "Views",
      icon: eyeImg,
      count: Views,
      percentage: "5%",
      // days: "vs last 7 days",
      bgColor: "#11dbe8",
    },
    {
      title: "Followers",
      icon: folllowerImg,
      count: Followers,
      percentage: "5%",
      // days: "vs last 7 days",
      bgColor: "#a6f683",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {Data.map((item, index) => (
        <HomeContainerCard
          key={index}
          className="border border-gray-300 rounded-3xl shadow-md h-auto sm:h-[24vh] sm:flex sm:justify-center sm:items-center"
        >
          <div className="flex sm:flex-col justify-center items-center pl-8 pr-8 sm:pl-0 sm:pr-0 py-1 sm:py-0">
            <div className="flex flex-col justify-center items-center">
              <div className="flex sm:justify-center sm:items-center sm:gap-4">
                <div
                  className="hidden sm:block border rounded-full"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <img src={item.icon} alt="" className="p-2 h-10 w-10" />
                </div>
                <p className="">{item.title}</p>
              </div>
              <div className="text-[1.8rem] font-medium">{item.count}</div>
            </div>
            {/* <div className="flex xl:p-2 justify-center items-center pt-6 sm:pt-0"> */}
            {/* <div className="text-xs sm:text-sm md:text-[0.7rem] lg:text-[0.7rem] px-2 py-1 bg-green-200 rounded-3xl text-black"> */}
            {/* +{item.percentage} */}
            {/* </div> */}
            {/* <p className="text-xs md:text-[0.8rem] lg:text-xs pl-3"> */}
            {/* {item.days} */}
            {/* </p> */}
            {/* </div> */}
          </div>
        </HomeContainerCard>
      ))}
    </div>
  );
};

export default Affilliates;
