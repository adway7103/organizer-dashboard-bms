import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const trafficChart = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update state when window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine chart height based on window width
  const chartHeight = windowWidth < 1024 ? 550 : 355;
  const data = [
    { name: "June 12", value: 0 },
    { name: "June 14", value: 1000 },
    { name: "June 16", value: 600 },
    { name: "June 18", value: 700 },
    { name: "June 20", value: 550 },
    { name: "June 22", value: 3000 },
    { name: "June 24", value: 900 },
    { name: "June 26", value: 980 },
    { name: "June 28", value: 2600 },
  ];

  return (
    <div className="border relative bg-blue-box rounded-3xl shadow-xl flex flex-col gap-y-2 justify-center w-full items-center">
      <AreaChart
        width={600}
        height={chartHeight}
        data={data}
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
