import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
} from "../../../ui/Card";

const chartData = [
  { browser: "chrome", visitors: 0, fill: "#0088FE" },
  { browser: "safari", visitors: 0, fill: "#000000" },
  { browser: "edge", visitors: 0, fill: "#FFBB28" },
  { browser: "other", visitors: 0, fill: "#800080" },
];

export function SalesPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="h-auto bg-transparent shadow-none rounded">
      <div className="sm:col-span-1">
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square xl:w-full xl:h-full">
            <PieChart width={180} height={140}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                outerRadius={68}
                strokeWidth={0}
                cornerRadius={10}  
                paddingAngle={5}              >
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
    </Card>
  );
}

export default SalesPieChart;
