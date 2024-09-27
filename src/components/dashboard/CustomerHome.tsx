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

interface AgeDistribution {
  unknown: number;
  "0-18": number;
  "18-19": number;
  "20-24": number;
  "25-29": number;
  "30-39": number;
  "40-49": number;
  "50-59": number;
  "60+": number;
}

const CustomerHome = () => {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [genderDistribution, setGenderDistribution] =
    useState<GenderDistribution>();
  const [monthlyBookingData, setMonthlyBookingData] = useState<
    MonthlyBookingData[]
  >([]);
  const [ageDistribution, setAgeDistribution] = useState<AgeDistribution>();

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
      setAgeDistribution({
        unknown: response.ageDistribution.unknown.percentage,
        "0-18": response.ageDistribution["0-18"].percentage,
        "18-19": response.ageDistribution["18-19"].percentage,
        "20-24": response.ageDistribution["20-24"].percentage,
        "25-29": response.ageDistribution["25-29"].percentage,
        "30-39": response.ageDistribution["30-39"].percentage,
        "40-49": response.ageDistribution["40-49"].percentage,
        "50-59": response.ageDistribution["50-59"].percentage,
        "60+": response.ageDistribution["60+"].percentage,
      });
    };

    fetchData();
  }, []);

  const ageDistributionPercentages = {
    "0-18": Number(ageDistribution?.["0-18"] || 0),
    "19-29":
      Number(ageDistribution?.["18-19"] || 0) +
      Number(ageDistribution?.["20-24"] || 0) +
      Number(ageDistribution?.["25-29"] || 0),
    "30-39": Number(ageDistribution?.["30-39"] || 0),
    "40-49": Number(ageDistribution?.["40-49"] || 0),
    "51+":
      Number(ageDistribution?.["50-59"] || 0) +
      Number(ageDistribution?.["60+"] || 0),
    Unknown: Number(ageDistribution?.unknown || 0),
  };

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
          <FollowerPieChart
            heading={"Attendees By Age"}
            ageDistribution={ageDistributionPercentages}
          />
        </div>
      </div>
      <CustomerTable />
    </div>
  );
};

export default CustomerHome;
