import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import CustomerChart from "./Customers/CustomerChart";
import { CustomerTable } from "./Customers/CustomerTable";
import FollowerPieChart from "./Followers/FollowerPieChart";

const CustomerHome = () => {
  return (
    <div className="sm:ml-8 min-w-[300px]">
      <h2 className="font-semibold text-[2rem] px-4">Customers</h2>
      <div className="grid grid-cols-6 xl:grid-cols-10 gap-4 my-3">
        <div className="col-span-6 md:col-span-2 xl:col-span-2">
          <div>
            <CountCard heading={"Followers"} count={5000}/>
          </div>
          <div>
            <TextBlast />
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-4">
          <CustomerChart />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2"><FollowerPieChart heading={"Attendees By Gender"}/></div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2"><FollowerPieChart heading={"Attendees By Age"}/></div>
      </div>
      <CustomerTable />
    </div>
  );
};

export default CustomerHome;

