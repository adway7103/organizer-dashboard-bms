import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardFooter, CardTitle } from "../../ui/Card";
import yellow from "../../../../public/follower/yellow.png";
import purple from "../../../../public/follower/purple.png";
import extra from "../../../../public/follower/extra.png";

interface PieChartProps {
  heading: string;
  male?: string;
  female?: string;
  unknownFirstPie?: string;
  ageDistribution?: {
    counts: {
      "0-18": number;
      "19-30": number;
      "31-50": number;
      "51+": number;
      Unknown: number;
    };
    percentages: {
      "0-18": string;
      "19-30": string;
      "31-50": string;
      "51+": string;
      Unknown: string;
    };
  };
}

export function FollowerPieChart({
  heading,
  male,
  female,
  unknownFirstPie,
  ageDistribution,
}: PieChartProps) {
  let chartData: any = [];

  if (heading === "Attendees By Gender") {
    chartData = [
      { gender: "male", visitors: Number(male), fill: "#800080" },
      { gender: "female", visitors: Number(female), fill: "#FFBB28" },
      { gender: "unknown", visitors: Number(unknownFirstPie), fill: "#8e854b" },
    ];
  } else if (heading === "Attendees By Age" && ageDistribution) {
    chartData = [
      {
        ageGroup: "0-18",
        visitors: ageDistribution.counts["0-18"],
        fill: "#FFBB28",
      },
      {
        ageGroup: "19-30",
        visitors: ageDistribution.counts["19-30"],
        fill: "#800080",
      },
      {
        ageGroup: "31-50",
        visitors: ageDistribution.counts["31-50"],
        fill: "#8e854b",
      },
      {
        ageGroup: "51+",
        visitors: ageDistribution.counts["51+"],
        fill: "#FFBB28",
      },
      {
        ageGroup: "Unknown",
        visitors: ageDistribution.counts["Unknown"],
        fill: "#8e854b",
      },
    ];
  }
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: any) => acc + curr.visitors, 0);
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
                nameKey="gender"
                innerRadius={50}
                outerRadius={56}
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
      <div>
        <CardFooter className="">
          {heading === "Attendees By Gender" && (
            <div className="flex items-center justify-between gap-8 sm:gap-4">
              <div className="text-xs">
                <div className="text-center">Female</div>
                <div className="flex items-center">
                  <span>
                    <img src={yellow} alt="" className="pr-1" />
                  </span>
                  {female}{" "}
                </div>
              </div>
              <div className="text-xs">
                <div className="text-center">Male</div>
                <div className="flex items-center">
                  <span>
                    <img src={purple} alt="" className="pr-1" />
                  </span>
                  {male}%{" "}
                </div>
              </div>
              <div className="text-xs">
                <div className="text-center">Unknown</div>
                <div className="flex items-center justify-center">
                  <span>
                    <img src={extra} alt="" className="pr-1" />
                  </span>
                  {unknownFirstPie}%{" "}
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
                    {ageDistribution?.percentages["Unknown"]}%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 0-18</div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    {ageDistribution?.percentages["0-18"]}%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 19-30</div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    {ageDistribution?.percentages["19-30"]}%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 31-50 </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    {ageDistribution?.percentages["31-50"]}%
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div> 51+ </div>
                  <div className="flex items-center">
                    <span>
                      <img src={purple} alt="" className="pr-1" />
                    </span>
                    {ageDistribution?.percentages["51+"]}%
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
