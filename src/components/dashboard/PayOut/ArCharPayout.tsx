import { AreaChart, Area, Tooltip } from "recharts";

type ArCharPayoutProps = {
  color: string;
  heading: string;
};
const ArCharPayout = ({ color, heading }: ArCharPayoutProps) => {
  const data:any = [
   
  ];
  return (
    <div className="flex border justify-between items-center h-[220px] bg-blue-box rounded-3xl shadow-xl p-6">
      <div className="flex flex-col h-full justify-around">
        <p className="text-2xl font-semibold">{heading}</p>
        <p className="font-bold text-3xl text-[#60769D]">$0</p>

        <p className="text-sm">All past events</p>
      </div>
      <AreaChart
        width={260}
        height={120}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" />
        <YAxis /> */}
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke={color} fill={color} />
      </AreaChart>
    </div>
  );
};

export default ArCharPayout;
