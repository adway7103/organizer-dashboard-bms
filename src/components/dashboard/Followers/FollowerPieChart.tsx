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

export function FollowerPieChart({ heading }: any) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="sm:grid sm:grid-cols-2 lg:grid-cols-1 xl:h-[34vh] bg-transparent shadow-none rounded border ">
      <div className="sm:col-span-1">
        <CardHeader className="text-center pt-1">
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 xl:ml-5 h-[14vh]">
          <div className="aspect-square">
            <PieChart width={160} height={120}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={50}
                outerRadius={60}
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
                            className="fill-foreground text-2xl font-bold"
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
        <CardFooter className="flex-col text-xs">
            {heading === "Attendees By Gender" && (
              <div className="flex pl-2 pr-3 mt-9 items-center justify-between">
                <div>
                  <div>Female</div>
                  <div>35%</div>
                </div>
                <div>
                  <div>Male</div>
                  <div>90%</div>
                </div>
                <div>
                  <div>Unknown</div>
                  <div>5%</div>
                </div>
              </div>
            )}
            {heading === "Attendees By Age" && (
              <div className="flex pl-2 pr-3 mt-9 items-center justify-between">
                <div>
                  <div>
                    unknown <span>35%</span>
                  </div>
                  <div>
                    18-19 <span>35%</span>
                  </div>
                  <div>
                    20-24 <span>35%</span>
                  </div>
                  <div>
                    25-29 <span>35%</span>
                  </div>
                </div>
                <div>
                  <div>
                    30-39 <span>35%</span>
                  </div>
                  <div>
                    40-49 <span>35%</span>
                  </div>
                  <div>
                    50-59 <span>35%</span>
                  </div>
                  <div>
                    60+ <span>35%</span>
                  </div>
                </div>
              </div>
            )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default FollowerPieChart;
