import Total from './Affiliates/Total'
import TextBlast from "./Affiliates/TextBlast";
import TotalCommision from "./Affiliates/TotalCommision";
import AffiliateChart from "./Affiliates/AffiliateChart";
import { AffiliateTable } from "./Affiliates/AffiliateTable";
import CountCard from "./Affiliates/CountCard";

const AffiliateHome = () => {
  return (
    <div>
      <h2 className="font-semibold text-[2rem] pl-12">Affiliates</h2>
      <div className="grid grid-cols-2 gap-4 w-full h-[60vh] my-3 pr-7">
        <div className="col-span-1 grid grid-cols-9 gap-4">
          <div className="col-span-4">
            <div>
              <CountCard heading={"Affiliates"} count={"5000"} />
            </div>
            <div>
              <TextBlast />
            </div>
          </div>
          <div className="col-span-5">
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
      <AffiliateTable />
    </div>
  );
};

export default AffiliateHome;
