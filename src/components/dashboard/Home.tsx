import BarChartHome from "./Charts/BarChart";
import AreaChartHome from "./Charts/AreaChart";
import Payouts from "./Home/Payouts";
import CurrentlyEvent from "./Home/CurrentlyEvent";
import Affilliates from "./Home/Affilliates";
import PieChartComponent from "./Charts/PieChart";

const Home = () => {
  const dummyData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 50 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 40 },
    { name: "May", value: 10 },
    { name: "June", value: 70 },
    { name: "July", value: 90 },
    { name: "Aug", value: 50 },
    { name: "Sept", value: 30 },
    { name: "Oct", value: 40 },
  ];

  return (
    <div className="sm:ml-8 min-w-[300px]">
      <h1 className="font-semibold text-[2rem] pl-4">Dashboard</h1>

      <div className="grid grid-cols-1 grid-row-6 md:grid-row-3 lg:grid-row-2 lg:grid-cols-9 gap-4 lg:gap-7 min-h-[85vh] my-3 pr-4">
        <div className="col-span-9 lg:col-span-9 xl:col-span-4">
          <BarChartHome data={dummyData} />
        </div>
        <div className="col-span-9 lg:col-span-6 xl:col-span-3">
          <AreaChartHome data={dummyData} />
        </div>
        <div className="col-span-9 lg:col-span-3 xl:col-span-2">
          <PieChartComponent />
        </div>
        <div className="col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-3">
          <Affilliates />
        </div>
        <div className="col-span-9 md:col-span-2 lg:col-span-4 xl:col-span-2 pt-6 sm:pt-0">
          <Payouts />
        </div>
        <div className="col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-4 ">
          <CurrentlyEvent />
        </div>
      </div>
    </div>
  );
};

export default Home;
