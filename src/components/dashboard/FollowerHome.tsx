import CountCard from "./Affiliates/CountCard";
import TextBlast from "./Affiliates/TextBlast";
import FollowerChart from "./Followers/FollowerChart";
import FollowerPieChart from "./Followers/FollowerPieChart";
import { FollowerTable } from "./Followers/FollowerTable";
import { fetchFollowers } from "../../api/fetchFollowersApi";
import { useEffect, useState } from "react";

interface FollowerList {
  fname: string;
  lname: string;
  age: number;
  email: string;
  followedOn: string;
  eventsAttended: number;
  affiliationStatus: string;
}

interface AttendeesByGender {
  male: string;
  female: string;
  unknown: string;
}

interface AgeDistribution {
  counts: {
    "0-18": number;
    "19-30": number;
    "31-50": number;
    "51+": number;
    Unknown: number;
  };
  percentages: {
    "0-18": string;
    "19-30": string;
    "31-50": string;
    "51+": string;
    Unknown: string;
  };
}

interface FollowersPerMonth {
  [month: string]: number;
}

const FollowerHome = () => {
  const [totalFollowers, setTotalFollowers] = useState<number>(0);
  const [followerList, setFollowerList] = useState<FollowerList[]>([]);
  const [genderPercentage, setGenderPercentage] = useState<AttendeesByGender>();
  const [ageDistribution, setAgeDistribution] = useState<AgeDistribution>();
  const [followersPerMonth, setFollowersPerMonth] = useState<FollowersPerMonth>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFollowers();
      setFollowersPerMonth(response.followersPerMonth)
      setAgeDistribution(response.ageDistribution);
      setGenderPercentage(response.genderPercentage);
      setFollowerList(response.followersList);
      setTotalFollowers(response.totalFollowers);
    };
    fetchData();
  }, []);

  return (
    <div className="sm:ml-8 min-w-[300px]">
      <h2 className="font-semibold text-[2rem] px-4">Followers</h2>
      <div className="grid grid-cols-6 xl:grid-cols-10 gap-4 my-3">
        <div className="col-span-6 md:col-span-2 xl:col-span-2">
          <CountCard heading={"Followers"} totalFollowers={totalFollowers} />
          <TextBlast />
        </div>
        <div className="col-span-6 md:col-span-4 xl:col-span-4">
          <FollowerChart followersPerMonth={followersPerMonth}/>
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart
            heading={"Attendees By Gender"}
            male={genderPercentage?.male}
            female={genderPercentage?.female}
            unknownFirstPie={genderPercentage?.unknown}
          />
        </div>
        <div className="col-span-6 md:col-span-3 xl:col-span-2">
          <FollowerPieChart
            heading={"Attendees By Age"}
            ageDistribution={ageDistribution}
          />
        </div>
      </div>
      {followerList.map((follower, index) => (
        <FollowerTable
          key={index}
          name={follower.fname}
          lname={follower.lname}
          age={follower.age}
          email={follower.email}
          followedOn={follower.followedOn}
          eventsAttended={follower.eventsAttended}
          affiliationStatus={follower.affiliationStatus}
        />
      ))}
    </div>
  );
};

export default FollowerHome;
