import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import { Card, CardContent } from "../../ui/Card";

export function AffiliatePieChart({
  revenueDistribution,
  ticketsDistribution,
  heading,
}: any) {
  const chartData = React.useMemo(() => {
    if (heading === "Total Revenue") {
      return revenueDistribution?.map((r: any, index: number) => ({
        name: r.eventName,
        value: parseFloat(r.totalRevenue) || 0,
        fill:
          index === 0
            ? "#0088FE"
            : index === 1
            ? "#800080"
            : index === 2
            ? "#FFBB28"
            : "#800080",
      }));
    } else if (heading === "Total tickets sold") {
      return ticketsDistribution?.map((t: any, index: number) => ({
        name: t.eventName,
        value: parseFloat(t.ticketsPercentage) || 0,
        fill:
          index === 0
            ? "#0088FE"
            : index === 1
            ? "#800080"
            : index === 2
            ? "#FFBB28"
            : "#800080",
      }));
    }
    return [];
  }, [heading, revenueDistribution, ticketsDistribution]);

  const total = React.useMemo(() => {
    return chartData?.reduce((acc: any, curr: any) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="h-auto bg-none shadow-none rounded">
      <div className="sm:col-span-1">
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square xl:w-full xl:h-full pt-1">
            <PieChart width={180} height={140}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={70}
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
                            {total.toLocaleString()}
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

export default AffiliatePieChart;
