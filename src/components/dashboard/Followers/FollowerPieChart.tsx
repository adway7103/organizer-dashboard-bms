import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardFooter, CardTitle } from "../../ui/Card";
import yellow from "../../../../public/follower/yellow.png";
import purple from "../../../../public/follower/purple.png";
import extra from "../../../../public/follower/extra.png";

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
    <Card className="h-auto sm:h-[40vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-between sm:justify-center items-center max-sm:py-4">
      <div className="sm:col-span-1">
        <CardTitle>{heading}</CardTitle>
        <CardContent className="">
          <div className="mx-auto aspect-square flex justify-center items-center">
            <PieChart width={120} height={120}>
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
          {heading === "Attendees By Gender" && (
            <div className="flex items-center justify-between gap-8 sm:gap-4">
              <div>
                <div>Female</div>
                <div className="flex items-center">
                  <span>
                    <img src={yellow} alt="" className="pr-1" />
                  </span>
                  35%
                </div>
              </div>
              <div>
                <div>Male</div>
                <div className="flex items-center">
                  <span>
                    <img src={purple} alt="" className="pr-1" />
                  </span>
                  90%
                </div>
              </div>
              <div>
                <div>Unknown</div>
                <div className="flex items-center justify-center">
                  <span>
                    <img src={extra} alt="" className="pr-1" />
                  </span>
                  5%
                </div>
              </div>
            </div>
          )}
          {heading === "Attendees By Age" && (
            <div className="flex justify-center items-center text-xs gap-10 sm:gap-4">
              <div className="">
                <div className="flex gap-2">
                  <div>unknown</div>
                  <div className="flex items-center">
                    <span>
                      <img src={yellow} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 18-19</div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 20-24</div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 25-29 </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-4">
                  <div>30-39 </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>40-49 </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>50-59 </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>60+ </div>
                  <div className="flex items-center pl-2.5">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    35%
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );

  // return (
  //   <Card className="h-auto sm:h-[40vh] bg-transparent shadow-none rounded border border-gray-300">
  //     <div className="">
  //         <CardTitle>{heading}</CardTitle>
  //       <CardContent className="">
  //         <div className="aspect-square">
  //           <PieChart width={160} height={120}>
  //             <Tooltip cursor={false} />
  //             <Pie
  //               data={chartData}
  //               dataKey="visitors"
  //               nameKey="browser"
  //               innerRadius={50}
  //               outerRadius={60}
  //               strokeWidth={5}
  //             >
  //               <Label
  //                 content={({ viewBox }) => {
  //                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
  //                     return (
  //                       <text
  //                         x={viewBox.cx}
  //                         y={viewBox.cy}
  //                         textAnchor="middle"
  //                         dominantBaseline="middle"
  //                       >
  //                         <tspan
  //                           x={viewBox.cx}
  //                           y={viewBox.cy}
  //                           className="fill-foreground text-2xl font-bold"
  //                         >
  //                           {totalVisitors.toLocaleString()}
  //                         </tspan>
  //                       </text>
  //                     );
  //                   }
  //                 }}
  //               />
  //             </Pie>
  //           </PieChart>
  //         </div>
  //       </CardContent>
  //     </div>
  //
  //   </Card>
  // );
}

export default FollowerPieChart;
