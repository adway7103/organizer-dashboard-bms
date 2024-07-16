import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card";

const chartData = [
  { browser: "chrome", visitors: 8475, fill: "#0088FE" },
  { browser: "safari", visitors: 5200, fill: "#000000" },
  { browser: "edge", visitors: 2173, fill: "#FFBB28" },
  { browser: "other", visitors: 4190, fill: "#800080" },
];

export function PieChartComponent() {
  
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="sm:grid sm:grid-cols-2 lg:grid-cols-1 xl:h-[55vh] border border-gray-300">
      <div className="sm:col-span-1">
        <CardHeader className="text-center">
          <CardTitle>Revenue by Event</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square  xl:w-full xl:h-full">
            <PieChart width={220} height={200}>
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
                            className="fill-foreground text-3xl font-bold"
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
        <CardFooter className="flex-col text-sm">
          <div className="flex p-1 items-center justify-between">
            <div className="">Logo</div>
            <div className="">WEFVWRFWE</div>
            <div className="">2,000</div>
          </div>
          <div className="flex p-1 items-center justify-between">
            <div className="">Logo</div>
            <div className="">WEFVWRFWE</div>
            <div className="">2,000</div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default PieChartComponent;
