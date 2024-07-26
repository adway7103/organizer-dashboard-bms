import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import FollowerChart from "./Followers/FollowerChart";
import FollowerPieChart from "./Followers/FollowerPieChart";
import { FollowerTable } from "./Followers/FollowerTable";

const FollowerHome = () => {
  return (
    <div className="sm:ml-8 min-w-[300px]">
      <h2 className="font-semibold text-[2rem] px-4">Followers</h2>
      <div className="grid grid-cols-6 xl:grid-cols-10 gap-4 my-3">
        <div className="col-span-6 md:col-span-2 xl:col-span-2">
          <div>
            <CountCard heading={"Followers"} count={"5000"} />
          </div>
          <div>
            <TextBlast />
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-4">
          <FollowerChart />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart heading={"Attendees By Gender"} />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart heading={"Attendees By Age"} />
        </div>
      </div>
      <FollowerTable />
    </div>
  );
};

export default FollowerHome;
