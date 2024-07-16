import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import CustomerChart from "./Customers/CustomerChart";
import { CustomerTable } from "./Customers/CustomerTable";

const CustomerHome = () => {
  return (
    <div className="ml-8">
      <h1 className="font-semibold text-[2rem] pl-4">Customers</h1>

      <div className="grid grid-cols-5 gap-4 my-3">
        <div className="col-span-1">
          <div>
            <CountCard heading={"Customers"} count={"5000"} />
          </div>
          <div>
            <TextBlast />
          </div>
        </div>
        <div className="col-span-2">
          <CustomerChart />
        </div>
        <div className="col-span-1">pie chart</div>
        <div className="col-span-1">pie chart</div>
      </div>
      <CustomerTable />
    </div>
  );
};

export default CustomerHome;
