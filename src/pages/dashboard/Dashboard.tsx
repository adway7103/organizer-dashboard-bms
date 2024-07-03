import { InputLabel, MenuItem, Select } from "@mui/material";
import Navbar from "../../components/Navbar";
import AreaChartHome from "../../components/dashboard/Charts/AreaChart";
import BarChartHome from "../../components/dashboard/Charts/BarChart";
import CurrentlyEvent from "../../components/dashboard/Home/CurrentlyEvent";
import Payouts from "../../components/dashboard/Home/Payouts";
import TicketSold from "../../components/dashboard/Home/TicketSold";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const dummyData = [
    { name: "Category 1", value: 10 },
    { name: "Category 2", value: 50 },
    { name: "Category 3", value: 30 },
    { name: "Category 4", value: 40 },
    { name: "Category 5", value: 10 },
    { name: "Category 6", value: 70 },
    { name: "Category 7", value: 90 },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden mt-14 w-full">
        <div className="w-40"></div>
        <div className="mt-4">
          <h1 className="col-span-full font-bold text-4xl my-4">Dashboard</h1>
          {/* month selet group */}
          <div className="w-full flex items-center justify-start gap-4">
            <InputLabel id="month-select-label">by month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              label="Month"
              className="w-40"
            >
              <MenuItem value="" disabled>
                Select a month
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 2xl:gap-4">
            <BarChartHome data={dummyData} />
            <AreaChartHome data={dummyData} />
            {/* <AreaChartHome data={dummyData} /> */}
            <div className="w-full overflow-hidden mr-80">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
            <Payouts />
            <TicketSold />
            <CurrentlyEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
