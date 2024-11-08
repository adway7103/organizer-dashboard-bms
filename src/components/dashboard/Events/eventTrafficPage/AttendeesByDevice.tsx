import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardFooter, CardTitle } from "../../../ui/Card";
import yellow from "../../../../../public/follower/yellow.png";
import purple from "../../../../../public/follower/purple.png";
import extra from "../../../../../public/follower/extra.png";

interface PieChartProps {
  heading: string;
  mobile?: { number: number; percentage: string };
  tablet?: { number: number; percentage: string };
  laptop?: { number: number; percentage: string };
}

function AttendeesByDevicePie({
  heading,
  mobile = { number: 0, percentage: "0.00%" },
  tablet = { number: 0, percentage: "0.00%" },
  laptop = { number: 0, percentage: "0.00%" },
}: PieChartProps) {
  const chartData = [
    { device: "Mobile", visitors: Number(mobile?.number), fill: "#800080" },
    { device: "Tablet", visitors: Number(tablet?.number), fill: "#FFBB28" },
    { device: "Laptop", visitors: Number(laptop?.number), fill: "#8e854b" },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce(
      (acc: number, curr) => Number(acc) + Number(curr.visitors),
      0
    );
  }, [chartData]);

  return (
    <Card className="h-auto sm:h-[36vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-between sm:justify-center items-center max-sm:py-4">
      <div className="sm:col-span-1">
        <div className="flex justify-center items-center">
          {" "}
          <CardTitle>{heading}</CardTitle>
        </div>{" "}
        <CardContent className="">
          <div className="mx-auto flex justify-center items-center">
            <PieChart width={220} height={120}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="device"
                innerRadius={50}
                outerRadius={56}
                strokeWidth={0}
                cornerRadius={10}
                paddingAngle={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </div>
        </CardContent>
      </div>
      <div>
        <CardFooter className="">
          <div className="flex items-center justify-between gap-8">
            <div className="text-xs">
              <div className="text-center">Mobile</div>
              <div className="flex items-center">
                <span>
                  <img src={yellow} alt="" className="pr-1" />
                </span>
                {mobile.percentage}%{" "}
              </div>
            </div>
            <div className="text-xs">
              <div className="text-center">Tablet</div>
              <div className="flex items-center">
                <span>
                  <img src={purple} alt="" className="pr-1" />
                </span>
                {tablet.percentage}%{" "}
              </div>
            </div>
            <div className="text-xs">
              <div className="text-center">Laptop</div>
              <div className="flex items-center justify-center">
                <span>
                  <img src={extra} alt="" className="pr-1" />
                </span>
                {laptop.percentage}%{" "}
              </div>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AttendeesByDevicePie;
