import BarChartHome from "./Charts/BarChart";
import AreaChartHome from "./Charts/AreaChart";
import Payouts from "./Home/Payouts";
import Affilliates from "./Home/Affilliates";
import PieChartComponent from "./Charts/PieChart";
import { fetchDashboard } from "../../api/fetchDashboard";
import { useEffect, useState } from "react";
import DTable from "./Home/DTable";
import HomeContainerCard from "./HomeContainerCard";

interface DashboardData {
  totalRevenue: number;
  totalTicketsSold: number;
  revenuePerEvent: any[]; // You can replace 'any' with a more specific type if needed
  customerCount: number;
  totalViews: number;
  followersCount: number;
  liveEvents: LiveEvent[];
  affiliates: string;
  payouts: { previousPayout: string; nextPayout: string };
}

interface LiveEvent {
  _id: string;
  title: string;
  posterUrl: string;
}

const Home = () => {
  const [data, setData] = useState<DashboardData>();
  const dummyData: any = [];

  const fetchDashboardData = async () => {
    const response = await fetchDashboard();
    setData(response);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="ml-4 sm:ml-8 min-w-[300px]">
      <h1 className="font-semibold text-[2rem] pl-4">Dashboard</h1>

      <div className="grid grid-cols-1 grid-row-6 md:grid-row-3 lg:grid-row-2 lg:grid-cols-9 gap-4 lg:gap-6 min-h-[85vh] my-3 pr-4">
        <div className="col-span-9 lg:col-span-9 xl:col-span-4">
          <BarChartHome data={dummyData} />
        </div>
        <div className="col-span-9 lg:col-span-6 xl:col-span-3">
          <AreaChartHome data={dummyData} />
        </div>
        <div className="col-span-9 lg:col-span-3 xl:col-span-2">
          <PieChartComponent />
        </div>
        <div className="col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-3">
          <Affilliates
            Affiliates={data?.affiliates || "0"}
            Customers={data?.customerCount || 0}
            Views={data?.totalViews || 0}
            Followers={data?.followersCount || 0}
          />
        </div>
        <div className="col-span-9 md:col-span-2 lg:col-span-4 xl:col-span-2 sm:pt-0">
          <Payouts
            payouts={data?.payouts.previousPayout}
            nextPayouts={data?.payouts.nextPayout}
          />{" "}
        </div>
        <div className="col-span-9 md:col-span-9 lg:col-span-9 xl:col-span-4 ">
          <HomeContainerCard className="xl:h-[50vh] w-full px-6 py-5 border border-gray-300 rounded-3xl">
            <div className="flex w-full gap-1 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8 border border-black rounded-full p-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <h1 className="text-lg font-medium">List of Live Events</h1>
            </div>

            <DTable data={data?.liveEvents} />
          </HomeContainerCard>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
