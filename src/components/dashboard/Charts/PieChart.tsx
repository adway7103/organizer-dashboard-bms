import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import img from "../../../../public/affiliates/image.png";
import purple from "../../../../public/affiliates/purple.png";
import blue from "../../../../public/dashboard/blue.png";
import money from "../../../../public/dashboard/money.png";

import { Card, CardContent } from "../../ui/Card";

const chartData = [
  { browser: "chrome", visitors: 8475, fill: "#0088FE" },
  { browser: "safari", visitors: 5200, fill: "#000000" },
  { browser: "edge", visitors: 2173, fill: "#FFBB28" },
  { browser: "other", visitors: 4190, fill: "#800080" },
];

export function AffiliatePieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="h-auto sm:h-[50vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-center items-center max-sm:py-4 ">
      <div className="sm:col-span-1">
        <div className="flex w-full gap-2 items-center justify-center">
          <img src={money} alt="" className="border border-black rounded-full p-2"/>
          <h1 className="text-lg font-medium">Revenue by Event</h1>
        </div>
        <CardContent className="">
          <div className="mx-auto aspect-square flex items-center">
            <PieChart width={180} height={160}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={64}
                outerRadius={80}
                strokeWidth={5}
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
      <div className="flex flex-col">
        <div className="flex p-1 items-center justify-between gap-x-4">
          <div className="">
            <img src={img} alt="" />
          </div>
          <div className="">WEFVWRFWE</div>
          <div className="flex pl-2 justify-center items center">
            <div>
              <img src={blue} alt="" className="mt-1 xl:mt-2" />
            </div>
            <div className="pl-1">2,000</div>
          </div>
        </div>
        <div className="flex p-1 items-center justify-between gap-x-4">
          <div className="">
            <img src={img} alt="" />
          </div>
          <div className="">WEFVWRFWE</div>
          <div className="flex pl-2 justify-center items center">
            <div>
              <img src={purple} alt="" className="mt-1 xl:mt-2" />
            </div>
            <div className="pl-1">2,000</div>
          </div>{" "}
        </div>
      </div>
    </Card>
  );
}

export default AffiliatePieChart;
