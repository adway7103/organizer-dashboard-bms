import { AreaChart, Area, Tooltip, XAxis, CartesianGrid } from "recharts";

const SalesOverTime = () => {
  const data: any = [];

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
