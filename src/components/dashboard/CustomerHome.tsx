import { useEffect, useState } from "react";
import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import CustomerChart from "./Customers/CustomerChart";
import { CustomerTable } from "./Customers/CustomerTable";
import FollowerPieChart from "./Followers/FollowerPieChart";
import { fetchCustomers } from "../../api/fetchCustomersApi";

interface MonthlyBookingData {
  month: string;
  customerCount: number;
}
interface MonthlyBookingData {
  month: string;
  year: number;
  bookings: number;
}
interface GenderDistribution {
  male: number;
  female: number;
  unknown: number;
}

const CustomerHome = () => {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [genderDistribution, setGenderDistribution] =
    useState<GenderDistribution>();
  const [monthlyBookingData, setMonthlyBookingData] = useState<
    MonthlyBookingData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCustomers();

      setMonthlyBookingData(response.monthlyBookingData);
      setTotalCustomers(response.totalCustomers);
      setGenderDistribution({
        male: parseFloat(response.genderDistribution.male.replace("%", "")),
        female: parseFloat(response.genderDistribution.female.replace("%", "")),
        unknown: parseFloat(
          response.genderDistribution.unknown.replace("%", "")
        ),
      });
    };

    fetchData();
  }, []);

  return (
    <div className="ml-4 sm:ml-8 min-w-[300px]">
      <h2 className="font-semibold text-[2rem] px-4">Customers</h2>
      <div className="grid grid-cols-6 xl:grid-cols-10 gap-4 my-3 pr-4">
        <div className="col-span-6 md:col-span-2 xl:col-span-2">
          <div>
            <CountCard heading={"Customers"} count={totalCustomers} />
          </div>
          <div>
            <TextBlast className="bg-[#954b7c]" />
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-4">
          <CustomerChart monthlyBookingData={monthlyBookingData} />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart
            heading={"Attendees By Gender"}
            male={genderDistribution?.male || 0}
            female={genderDistribution?.female || 0}
            unknownGender={genderDistribution?.unknown || 0}
          />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart heading={"Attendees By Age"} />
        </div>
      </div>
      <CustomerTable />
    </div>
  );
};

export default CustomerHome;
