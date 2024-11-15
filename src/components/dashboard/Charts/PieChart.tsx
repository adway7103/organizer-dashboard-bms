import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import img from "../../../../public/affiliates/image.png";
import purple from "../../../../public/affiliates/purple.png";
import blue from "../../../../public/dashboard/blue.png";
import money from "../../../../public/dashboard/money.png";

import { Card, CardContent } from "../../ui/Card";

export function AffiliatePieChart({ revenuePerEvent }: any) {
  const firstTwoPercentageDistribution =
    revenuePerEvent?.percentageDistribution.slice(0, 2);

  const chartData = [
    {
      browser: firstTwoPercentageDistribution[0]?.eventName,
      visitors: firstTwoPercentageDistribution[0]?.totalRevenue || 0,
      fill: "#0088FE",
    },
    {
      browser: firstTwoPercentageDistribution[1]?.eventName,
      visitors: firstTwoPercentageDistribution[1]?.totalRevenue || 0,
      fill: "#800080",
    },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) => Number(acc) + Number(curr?.visitors),
      0
    );
  }, []);

  return (
    <Card className="h-auto sm:h-[50vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-center items-center max-sm:py-4 ">
      <div className="sm:col-span-1">
        <div className="flex w-full gap-2 items-center justify-center">
          <img
            src={money}
            alt=""
            className="border border-black rounded-full p-2"
          />
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
                innerRadius={70}
                outerRadius={80}
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
                            {Number(totalVisitors)}
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
        <div className="flex flex-col w-full gap-4">
          {firstTwoPercentageDistribution &&
            firstTwoPercentageDistribution.map((item: any, index: number) => (
              <div key={index} className="flex items-center w-full">
                <div className="h-full w-10">
                  <img src={img} alt="" />
                </div>
                <div className="hover:line-clamp-none line-clamp-2 leading-tight text-xs w-[120px]">
                  {item?.eventName}
                </div>
                <div className="flex justify-center items-center pl-3">
                  <div>
                    <img src={index === 0 ? blue : purple} alt="" />
                  </div>
                  <div className="text-xs">{item?.percentageDistribution}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}

export default AffiliatePieChart;
