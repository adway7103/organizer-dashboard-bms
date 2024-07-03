import React from "react";
import HomeContainerCard from "../HomeContainerCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartHome = ({ data }: any) => {
  return (
    <HomeContainerCard className="col-span-2 h-[35vh]">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl">Revenue per month</h1>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="2 2" /> */}
          <XAxis
            dataKey="name"
            label={{ value: "Month", position: "insideBottom" }}
          />
          <YAxis
            label={{
              value: "Tickets sold",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Bar dataKey="value" width={10} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </HomeContainerCard>
  );
};

export default BarChartHome;
