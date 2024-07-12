import AreaChartHome from "../Charts/AreaChart";
import HomeContainerCard from "../HomeContainerCard";

const FollowerChart = () => {
  const dummyData = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 50 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 40 },
    { name: "May", value: 10 },
    { name: "June", value: 70 },
    { name: "July", value: 90 },
  ];
  return (
    <HomeContainerCard className="h-[34vh] shadow-none">
      <AreaChartHome data={dummyData} heading="Followers" />
    </HomeContainerCard>
  );
};

export default FollowerChart;