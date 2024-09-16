import React from "react";
import AreaChartHome from "../Charts/AreaChart";
import HomeContainerCard from "../HomeContainerCard";

interface MonthlyBookingData {
  month: string;
  year: number;
  bookings: number;
}

interface CustomerChartProps {
  monthlyBookingData: MonthlyBookingData[];
}

const CustomerChart: React.FC<CustomerChartProps> = ({
  monthlyBookingData,
}) => {
  const data = monthlyBookingData.map((item) => ({
    name: `${item.month}`,
    value: item.bookings,
  }));

  return (
    <HomeContainerCard className="h-[40vh] shadow-none min-w-[300px] w-full">
      <AreaChartHome data={data} heading="Customers"/>
    </HomeContainerCard>
  );
};

export default CustomerChart;
