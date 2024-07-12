import BarChartHome from "./Charts/BarChart";
import AreaChartHome from "./Charts/AreaChart";
import Payouts from "./Home/Payouts";
import CurrentlyEvent from "./Home/CurrentlyEvent";
import Affilliates from "./Home/Affilliates";
import PieChart from "./Charts/PieChart";

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
    <div className="grid grid-cols-2 lg:grid-cols-9 gap-2 2xl:gap-4 w-full min-h-[85vh] pl-4 pr-4">
      <div className="col-span-4">
        <BarChartHome data={dummyData} />
      </div>
      <div className="col-span-3">
        <AreaChartHome data={dummyData} />
      </div>
      <div className="col-span-2">
        <PieChart />
      </div>
      <div className="col-span-3"><Affilliates /></div>
      <div className="col-span-2">
        <Payouts />
      </div>
        <div className="col-span-4 "><CurrentlyEvent /></div>
       
    </div>
  );
};

export default Home;
