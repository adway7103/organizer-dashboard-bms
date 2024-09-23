import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import { Card, CardContent } from "../../../ui/Card";

interface SalesPieChartProps {
  data: { name: string; percentage: number; fill: string }[];
}
export function SalesPieChart({ data }: SalesPieChartProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.percentage, 0);
  }, [data]);

  return (
    <Card className="h-auto bg-transparent shadow-none rounded">
      <div className="sm:col-span-1">
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square xl:w-full xl:h-full">
            <PieChart width={180} height={140}>
              <Tooltip cursor={false} />
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="name"
                innerRadius={60}
                outerRadius={68}
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
    </Card>
  );
}

export default SalesPieChart;
