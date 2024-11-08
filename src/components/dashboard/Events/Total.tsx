import HomeContainerCard from "../HomeContainerCard";
import AffiliatePieChart from "../Affiliates/AffiliatePieChart";
import img from "../../../../public/affiliates/image.png";
import yellow from "../../../../public/affiliates/yellow.png";
import blue from "../../../../public/affiliates/blue.png";
import purple from "../../../../public/affiliates/purple.png";

interface TotalRevenue {
  eventId: string;
  eventName: string;
  revenuePercentage: string;
}
interface TotalTicket {
  eventId: string;
  eventName: string;
  ticketsPercentage: string;
}

interface PropsType {
  heading: string;
  revenueDistribution?: TotalRevenue[];
  ticketsDistribution?: TotalTicket[];
}
const colors = [blue, purple, yellow];

const Total = ({
  heading,
  ticketsDistribution,
  revenueDistribution,
}: PropsType) => {
  return (
    <HomeContainerCard className="h-auto border border-gray-300 rounded-3xl min-w-[300px] w-full sm:w-[300px] md:w-[565px] ">
      <div className="grid grid-cols-1 lg:grid-cols-10">
        <div className="flex justify-center items-center lg:mt-4 col-span-4">
          <AffiliatePieChart
            heading={heading}
            revenueDistribution={revenueDistribution}
            ticketsDistribution={ticketsDistribution}
            colors={colors}
          />
        </div>
        <div className="col-span-6 xl:px-5 flex flex-col justify-center items-center pb-2 ">
          <div className="font-medium text-xl pb-4">{heading}</div>

          {heading === "Total Revenue" ? (
            <>
              {revenueDistribution && revenueDistribution.length > 0 ? (
                <div className=" text-sm lg:pr-8 space-y-2">
                  {revenueDistribution
                    .slice(0, 3)
                    .map((r: any, index: number) => (
                      <div
                        className="flex items-center justify-between max-lg:px-4 max-lg:py-2 "
                        key={r.eventId}
                      >
                        <div className="flex justify-center items-center">
                          <img src={img} alt="" className="" />
                          <div className="hover:line-clamp-none line-clamp-2 leading-tight pl-3 pr-14 sm:pr-10">
                            {r.eventName}
                          </div>
                        </div>
                        <div className="w-8 flex justify-center items-center">
                          <img
                            src={colors[index % colors.length]}
                            alt=""
                            className="h-3 w-4"
                          />
                          <div className="pl-[4px] pr-12 sm:pr-4">
                            {r.percentageDistribution}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No data available</div>
              )}
            </>
          ) : heading === "Total tickets sold" ? (
            <>
              {ticketsDistribution && ticketsDistribution.length > 0 ? (
                <div className=" text-sm lg:pr-8 space-y-2">
                  {ticketsDistribution
                    .slice(0, 3)
                    .map((t: any, index: number) => (
                      <div
                        className="flex items-center justify-between max-lg:px-4 max-lg:py-2"
                        key={t.eventId}
                      >
                        <div className="flex justify-center items-center">
                          <img src={img} alt="" className="" />
                          <div className="hover:line-clamp-none line-clamp-2 leading-tight pl-3 pr-14 sm:pr-10">
                            {t.eventName}
                          </div>
                        </div>
                        <div className="w-8 flex justify-center items-center">
                          <img
                            src={colors[index % colors.length]}
                            alt=""
                            className="h-3 w-3"
                          />
                          <div className="pl-[4px] pr-12 sm:pr-4">
                            {t.ticketsPercentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No data available</div>
              )}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default Total;
