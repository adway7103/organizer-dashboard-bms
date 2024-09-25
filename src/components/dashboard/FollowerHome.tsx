import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import FollowerChart from "./Followers/FollowerChart";
import FollowerPieChart from "./Followers/FollowerPieChart";
import { FollowerTable } from "./Followers/FollowerTable";
import { fetchFollowers } from "../../api/fetchFollowersApi";
import { useEffect, useState } from "react";

// interface FollowerList {
//   fname: string;
//   lname: string;
//   age: number;
//   email: string;
//   followedOn: string;
//   eventsAttended: number;
//   affiliationStatus: string;
// }

interface AttendeesByGender {
  male: number;
  female: number;
  unknown: number;
}

interface FollowersPerMonth {
  [month: string]: number;
}

const FollowerHome = () => {
  const [totalFollowers, setTotalFollowers] = useState<number>(0);
  const [genderPercentage, setGenderPercentage] = useState<AttendeesByGender>();
  const [followersPerMonth, setFollowersPerMonth] =
    useState<FollowersPerMonth>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFollowers();
      setFollowersPerMonth(response.followersPerMonth);
      setGenderPercentage(response.genderPercentage);
      setTotalFollowers(response.totalFollowers);
    };
    fetchData();
  }, []);

  return (
    <div className="ml-4 sm:ml-8 min-w-[300px]">
      <h2 className="font-semibold text-[2rem] px-4">Followers</h2>
      <div className="grid grid-cols-6 xl:grid-cols-10 gap-4 my-3 pr-4">
        <div className="col-span-6 md:col-span-2 xl:col-span-2">
          <CountCard heading={"Followers"} count={totalFollowers} />
          <TextBlast className="bg-[#954b7c]" />
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-4">
          <FollowerChart followersPerMonth={followersPerMonth} />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart
            heading={"Attendees By Gender"}
            male={genderPercentage?.male || 0}
            female={genderPercentage?.female || 0}
            unknownGender={genderPercentage?.unknown || 0}
          />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart
            heading={"Attendees By Age"}
          />
        </div>
      </div>
      <FollowerTable />
    </div>
  );
};

export default FollowerHome;
