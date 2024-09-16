import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const trafficChart = ({ data }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartHeight = windowWidth < 1024 ? 550 : 355;

  const chartData =
    data && Object.keys(data).length > 0
      ? Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }))
      : null;
  if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="border relative bg-blue-box rounded-3xl shadow-xl flex flex-col gap-y-2 justify-center w-full items-center">
      <AreaChart
        width={600}
        height={chartHeight}
        data={chartData}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 35,
        }}
        className="absolute inset-0 w-full h-full"
        style={{
          width: "98%",
          height: "95%",
        }}
      >
        <CartesianGrid vertical horizontal={false} strokeOpacity={0.3} />
        <XAxis
          dataKey="name"
          tick={{ fill: "black", fontSize: 12 }}
          label={{
            value: "Date",
            offset: -10,
            position: "insideBottom",
            style: {
              textAnchor: "middle",
              fill: "black",
              fontSize: 14,
            },
          }}
        />
        <YAxis
          axisLine={false}
          tick={false}
          label={{
            value: "Page Views",
            angle: -90,
            style: {
              textAnchor: "middle",
              fill: "black",
              fontSize: 14,
            },
          }}
        />
        <Tooltip />
        <Area type="linear" dataKey="value" stroke="#647aa1" fill="#647aa1" />
      </AreaChart>
    </div>
  );
};

export default trafficChart;
