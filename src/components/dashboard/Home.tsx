import BarChartHome from "./Charts/BarChart";
import AreaChartHome from "./Charts/AreaChart";
import Payouts from "./Home/Payouts";
import TicketSold from "./Home/TicketSold";
import CurrentlyEvent from "./Home/CurrentlyEvent";

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 2xl:gap-4 w-full min-h-[85vh] pl-4">
      <BarChartHome data={dummyData} />
      <AreaChartHome data={dummyData} />
      <AreaChartHome data={dummyData} />

      <Payouts />
      <TicketSold />
      <CurrentlyEvent />
    </div>
  );
};

export default Home;
