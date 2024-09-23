import { AreaChart, Area, Tooltip, XAxis, CartesianGrid } from "recharts";

interface MonthlyData {
  month: string;
  salesCount: number;
}

interface SalesOverTimeProps {
  monthlyData?: MonthlyData[];
}

const SalesOverTime = ({ monthlyData }: SalesOverTimeProps) => {
  const data = monthlyData?.map((item: any) => ({
    name: item.month, // Month on the X-axis
    value: item.salesCount, // Sales count on the Y-axis
  }));
  return (
    <div className="border relative bg-blue-box rounded-3xl shadow-xl flex flex-col gap-y-2 justify-center w-full items-center">
      <h1 className="font-medium pt-4">Sales over time</h1>
      <AreaChart
        width={600}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0,
        }}
        className="absolute inset-0 w-full h-full"
        style={{
          width: "90%",
          height: "90%",
        }}
      >
        <CartesianGrid vertical horizontal={false} strokeOpacity={0.3} />
        <XAxis dataKey="name" tick={{ fill: "black" }} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#647aa1" fill="#647aa1" />
      </AreaChart>
    </div>
  );
};

export default SalesOverTime;
