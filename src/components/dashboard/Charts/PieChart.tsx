import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
} from "../../ui/Card";

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
    <Card className="h-auto sm:h-[55vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-center items-center">
      <div className="sm:col-span-1">
        <div className="text-center font-semibold text-xl">Revenue by Event</div>
        <CardContent className="">
          <div className="mx-auto aspect-square flex justidy-center items-center">
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
      <div>
        <div className="flex p-1 items-center justify-between space-x-4">
          <div className="">Logo</div>
          <div className="">WEFVWRFWE</div>
          <div className="">2,000</div>
        </div>
        <div className="flex p-1 items-center justify-between">
          <div className="">Logo</div>
          <div className="">WEFVWRFWE</div>
          <div className="">2,000</div>
        </div>
      </div>
    </Card>
  );
}

export default AffiliatePieChart;
