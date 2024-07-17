import Total from "./Affiliates/Total";
import TextBlast from "./Affiliates/TextBlast";
import TotalCommision from "./Affiliates/TotalCommision";
import AffiliateChart from "./Affiliates/AffiliateChart";
import { AffiliateTable } from "./Affiliates/AffiliateTable";
import CountCard from "./Affiliates/CountCard";

const AffiliateHome = () => {
  return (
<div className='ml-8 mr-16 min-w-[300px]'>
      <h2 className="font-semibold text-[2rem] px-4">Affiliates</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-auto my-3 pr-7">
        <div className="col-span-1 grid grid-cols-9 gap-4">
          <div className="col-span-9 sm:col-span-4">
            <div>
              <CountCard heading={"Affiliates"} count={"5000"} />
            </div>
            <div>
              <TextBlast />
            </div>
          </div>
          <div className="col-span-9 sm:col-span-5">
            <TotalCommision />
          </div>
        </div>
        <div className="col-span-1">
          <AffiliateChart />
        </div>
        <div className="col-span-1">
          <Total heading={"Total Revenue"}/>
        </div>
        <div className="col-span-1">
          <Total heading={"Total tickets sold"}/>
        </div>
      </div>
      <div className="h-auto lg:h-[calc(100vh-200px)]">
        <AffiliateTable />
      </div>
    </div>
  );
};

export default AffiliateHome;
