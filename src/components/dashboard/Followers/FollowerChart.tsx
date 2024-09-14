import React from "react";
import AreaChartHome from "../Charts/AreaChart";
import HomeContainerCard from "../HomeContainerCard";

interface FollowersPerMonth {
  [month: string]: number;
}

interface FollowerChartProps {
  followersPerMonth?: FollowersPerMonth;
}

const FollowerChart: React.FC<FollowerChartProps> = ({ followersPerMonth = {} }) => {

  const data = Object.entries(followersPerMonth || {}).map(([month, count]) => ({
    name: month,
    value: count,
  }));

  return (
    <HomeContainerCard className="h-[40vh] shadow-none min-w-[300px] w-full">
      <AreaChartHome data={data} heading="Followers" />
    </HomeContainerCard>
  );
};

export default FollowerChart;
