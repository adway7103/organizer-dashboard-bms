import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import HomeContainerCard from "../HomeContainerCard";

function AreaChartHome({ data }: any) {
  return (
    <HomeContainerCard className="h-[35vh] col-span-2 md:col-span-1">
      <div className="flex gap-1 items-center">
        <h1>Tickets sales per month</h1>
      </div>

      <ResponsiveContainer width="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#60769D"
          />
        </AreaChart>
      </ResponsiveContainer>
    </HomeContainerCard>
  );
}

export default AreaChartHome;
