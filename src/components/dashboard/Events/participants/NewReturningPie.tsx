import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardFooter, CardTitle } from "../../../ui/Card";
import yellow from "../../../../../public/follower/yellow.png";
import purple from "../../../../../public/follower/purple.png";

interface PieChartProps {
  returningCustomer?: string;
  newCustomer?: string;
 
}

function NewReturningCustomerPie({
  returningCustomer,
  newCustomer
}: PieChartProps) {
  let chartData: any = [];

  
    chartData = [
      { gender: "new", visitors: Number(newCustomer), fill: "#800080" },
      { gender: "returning", visitors: Number(returningCustomer), fill: "#FFBB28" },
    ];
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: any) => acc + curr.visitors, 0);
  }, []);
  return (
    <Card className="h-auto sm:h-[36vh] bg-transparent shadow-none rounded border border-gray-300 flex flex-col justify-between sm:justify-center items-center max-sm:py-4">
      <div className="sm:col-span-1">
        <CardTitle>New or returning customers</CardTitle>
        <CardContent className="">
          <div className="mx-auto flex justify-center items-center">
            <PieChart width={120} height={120}>
              <Tooltip cursor={false} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="gender"
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
            <div className="flex items-center justify-between gap-8">
              <div className="text-xs">
                <div className="text-center">Returning</div>
                <div className="flex items-center">
                  <span>
                    <img src={yellow} alt="" className="pr-1" />
                  </span>
                  {returningCustomer}%{" "}
                </div>
              </div>
              <div className="text-xs">
                <div className="text-center">New</div>
                <div className="flex items-center">
                  <span>
                    <img src={purple} alt="" className="pr-1" />
                  </span>
                  {newCustomer}%{" "}
                </div>
              </div>
       
            </div>
          
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

export default NewReturningCustomerPie;
