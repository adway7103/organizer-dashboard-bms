import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import FollowerChart from "./Followers/FollowerChart";
import { FollowerTable } from "./Followers/FollowerTable";

const FollowerHome = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div>
            <CountCard heading={"Followers"} count={"5000"} />
          </div>
          <div>
            <TextBlast />
          </div>
        </div>
        <div className="col-span-2">
          <FollowerChart />
        </div>
        <div className="col-span-1">pie chart</div>
        <div className="col-span-1">pie chart</div>
      </div>
      <FollowerTable/>
    </div>
  );
};

export default FollowerHome;
