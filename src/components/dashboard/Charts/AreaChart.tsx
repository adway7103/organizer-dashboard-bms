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

type AreaChartHomeTypes = {
  data: any;
  heading?: string;
  // type?: "customers" | "followers" | "sale";
};
function AreaChartHome({ data, heading }: AreaChartHomeTypes) {
  console.log(data);

  return (
    <HomeContainerCard className=" shadow-none col-span-2 md:col-span-1 border border-gray-300 rounded-3xl p-4 xl:h-[50vh]">
      <div className="flex gap-2 items-center text-lg font-medium">
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="1.18945"
            width="31"
            height="31"
            rx="15.5"
            stroke="black"
          />
          <path
            d="M17.4167 16.3145H13.6667C13.092 16.3145 12.5409 16.0862 12.1346 15.6799C11.7283 15.2735 11.5 14.7224 11.5 14.1478C11.5 13.5732 11.7283 13.0221 12.1346 12.6157C12.5409 12.2094 13.092 11.9811 13.6667 11.9811H19.6667V10.4811H16.4792V7.68945H14.9792V10.4811H13.6667C12.6942 10.4811 11.7616 10.8674 11.0739 11.5551C10.3863 12.2427 10 13.1753 10 14.1478C10 15.1203 10.3863 16.0529 11.0739 16.7405C11.7616 17.4281 12.6942 17.8145 13.6667 17.8145H17.4167C17.9911 17.8151 18.5418 18.0436 18.948 18.4498C19.3542 18.856 19.5827 19.4067 19.5833 19.9811V20.1478C19.5827 20.7222 19.3542 21.273 18.948 21.6791C18.5418 22.0853 17.9911 22.3138 17.4167 22.3145H11.0695V23.8145H14.9792V26.4395H16.4792V23.8145H17.4167C18.3888 23.8134 19.3208 23.4267 20.0082 22.7393C20.6956 22.0519 21.0822 21.1199 21.0833 20.1478V19.9811C21.0822 19.009 20.6956 18.077 20.0082 17.3896C19.3208 16.7022 18.3888 16.3155 17.4167 16.3145Z"
            fill="black"
          />
        </svg>
        {heading ? <h1>{heading}</h1> : <h1>Tickets Sale per Month</h1>}
      </div>
      <div className="flex justify-between px-5 py-2 ">
        <div className="flex gap-2 items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0714 2.73256H1.45918C1.28327 2.73256 1.11457 2.65905 0.990184 2.52821C0.865798 2.39737 0.795918 2.21992 0.795918 2.03488C0.795918 1.84985 0.865798 1.67239 0.990184 1.54155C1.11457 1.41071 1.28327 1.33721 1.45918 1.33721H10.4796C10.5851 1.33721 10.6864 1.29311 10.761 1.2146C10.8356 1.1361 10.8776 1.02963 10.8776 0.918605C10.8776 0.807584 10.8356 0.70111 10.761 0.622606C10.6864 0.544103 10.5851 0.5 10.4796 0.5H1.45918C1.07218 0.5 0.701035 0.66171 0.427385 0.949557C0.153735 1.2374 0 1.62781 0 2.03488V10.9651C0 11.3722 0.153735 11.7626 0.427385 12.0504C0.701035 12.3383 1.07218 12.5 1.45918 12.5H12.0714C12.3177 12.5 12.5539 12.3971 12.728 12.2139C12.9022 12.0307 13 11.7823 13 11.5233V3.7093C13 3.45025 12.9022 3.20181 12.728 3.01864C12.5539 2.83546 12.3177 2.73256 12.0714 2.73256ZM12.2041 11.5233C12.2041 11.5603 12.1901 11.5958 12.1652 11.6219C12.1404 11.6481 12.1066 11.6628 12.0714 11.6628H1.45918C1.28327 11.6628 1.11457 11.5893 0.990184 11.4584C0.865798 11.3276 0.795918 11.1502 0.795918 10.9651V3.40163C1.00113 3.51242 1.22852 3.57007 1.45918 3.56977H12.0714C12.1066 3.56977 12.1404 3.58447 12.1652 3.61064C12.1901 3.6368 12.2041 3.6723 12.2041 3.7093V11.5233ZM10.3469 7.33721C10.3469 7.4752 10.308 7.61009 10.2352 7.72482C10.1623 7.83955 10.0587 7.92897 9.93749 7.98178C9.8163 8.03458 9.68294 8.0484 9.55428 8.02148C9.42562 7.99456 9.30743 7.92811 9.21467 7.83054C9.12191 7.73297 9.05875 7.60865 9.03315 7.47332C9.00756 7.33798 9.02069 7.1977 9.0709 7.07022C9.1211 6.94274 9.20611 6.83378 9.31518 6.75711C9.42426 6.68045 9.55249 6.63953 9.68367 6.63953C9.85958 6.63953 10.0283 6.71304 10.1527 6.84388C10.2771 6.97472 10.3469 7.15217 10.3469 7.33721Z"
              fill="black"
            />
          </svg>

          <div>
            <p>0</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%">
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: -40,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical horizontal={false} strokeOpacity={0.3} />
          <XAxis
            dataKey="name"
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
          <YAxis axisLine={false} tick={false} />
          <Tooltip />
          <Area type="linear" dataKey="value" stroke="#8884d8" fill="#60769D" />
        </AreaChart>
      </ResponsiveContainer>
    </HomeContainerCard>
  );
}

export default AreaChartHome;
