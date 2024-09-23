import HomeContainerCard from "../HomeContainerCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
interface BarChartHomeProps {
  data: { month: string; totalRevenue: number }[]; // Adjust the type as per your data
}

const BarChartHome = ({ data }: BarChartHomeProps) => {
  return (
    <HomeContainerCard className="col-span-2 xl:h-[50vh] bg-gray-200 rounded-3xl shadow-none">
      <div className="flex items-center gap-4 p-6">
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="1.29004"
            width="31"
            height="31"
            rx="15.5"
            stroke="black"
          />
          <path
            d="M15.867 7.79004C15.2466 7.80258 14.801 7.92385 14.5053 8.14129L10.4534 10.3199L8.2005 13.3971C7.72577 14.1331 8.06308 15.5548 9.54558 14.6432L11.1697 12.4939C13.231 10.7088 17.437 11.5279 15.4423 15.1116C14.4637 17.1856 14.9217 18.1975 16.1835 18.6241L16.7582 16.6838C17.7535 14.4341 19.6108 14.0285 19.5358 12.2137L24 12.5357L23.9584 7.84858L15.867 7.79004ZM13.6141 12.1134C12.8895 12.1008 12.1774 12.4019 11.6611 12.8368L10.0328 14.9861C10.4784 15.3415 10.9281 15.1492 11.3737 14.7185C11.8984 14.9861 12.3065 14.5721 12.6397 13.7442C12.7771 13.1797 12.9812 12.7824 13.6141 12.1134ZM10.2993 16.1277C10.2827 16.1277 10.2618 16.1277 10.2452 16.1319C10.1078 16.1611 9.94536 16.3075 9.83709 16.642C9.72465 16.9765 9.69966 17.4532 9.79961 17.9634C9.89955 18.4694 10.1078 18.9001 10.341 19.1677C10.5658 19.4311 10.7741 19.5064 10.9115 19.4771C11.0531 19.452 11.2113 19.3015 11.3196 18.9711C11.432 18.6366 11.4612 18.1557 11.3612 17.6498C11.2571 17.1396 11.0489 16.7089 10.8199 16.4455C10.62 16.2113 10.4368 16.1277 10.2993 16.1277ZM13.7391 20.5936C13.4101 20.5978 12.9978 20.7023 12.5939 20.8988C12.1316 21.1288 11.7693 21.4466 11.5736 21.7393C11.3779 22.0279 11.3612 22.2453 11.4237 22.3749C11.4862 22.5004 11.6694 22.6217 12.0192 22.6384C12.369 22.6593 12.8396 22.5631 13.3018 22.3331C13.7641 22.1031 14.1264 21.7895 14.3221 21.4968C14.5178 21.2083 14.5345 20.9867 14.472 20.8612C14.4095 20.7316 14.2263 20.6145 13.8765 20.5978C13.8307 20.5936 13.789 20.5936 13.7391 20.5936ZM9.67468 24.5912C9.47895 24.5954 9.29989 24.6246 9.14164 24.6706C8.78767 24.7752 8.58362 24.9633 8.51699 25.185C8.4462 25.4108 8.51699 25.6784 8.75436 25.9669C8.99589 26.2513 9.39983 26.5231 9.89955 26.6736C10.3951 26.8241 10.8782 26.8199 11.2363 26.7112C11.5944 26.6067 11.7985 26.4185 11.8651 26.1969C11.9317 25.9711 11.8651 25.7035 11.6236 25.4149C11.3862 25.1306 10.9823 24.8588 10.4826 24.7083C10.1994 24.6246 9.92454 24.587 9.67468 24.5912Z"
            fill="black"
          />
        </svg>
        <div>
          <h1 className="text-xl font-medium">Revenue</h1>
          <h3 className="text-xs">Revenue Report</h3>
        </div>
      </div>
      <ResponsiveContainer width="90%" height="80%">
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 20,
            bottom: 40,
          }}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tick={{ fill: "black", fontSize: 12 }}
            label={{
              value: "Month",
              offset: -20,
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
            tick={{ fill: "black", fontSize: 12 }}
            label={{
              value: "Tickets sold",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "black",
                fontSize: 14,
              },
            }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }} // Make the hover effect transparent
          />{" "}
          <Bar
            dataKey="totalRevenue"
            fill="#a05d89"
            radius={[10, 10, 0, 0]}
            barSize={20}
            isAnimationActive={true} // Disables hover animation
          />
        </BarChart>
      </ResponsiveContainer>
    </HomeContainerCard>
  );
};

export default BarChartHome;
