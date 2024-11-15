import FollowerPieChart from "./ParticipantsByAge";
import CountCard from "./Count";
import { ParticipantsTable } from "./ParticipantsTable";
import NewReturningCustomerPie from "./NewReturningPie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchParticipantsDataApi } from "../../../../api/fetchParticipantsDataApi";
import SkeletonComponent from "../../../Skeleton";

interface ParticipantStats {
  num: number;
  percentage: number;
}

interface AgeDistribution {
  [key: string]: ParticipantStats;
}

interface NewVsReturning {
  returning: ParticipantStats;
  new: ParticipantStats;
}

interface ParticipantsDashboardResponse {
  eventTitle: string;
  totalTickets: number;
  participantsByGender: {
    female: string;
    male: string;
    unknown: string;
  };
  participantsByAge: AgeDistribution;
  newVsReturning: NewVsReturning;
  participants: any[]; // Replace 'any' with a more specific type if you have participant details
}

const Participants = () => {
  const { eventId } = useParams();

  const [participantsData, setParticipantsData] =
    useState<ParticipantsDashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchParticipantsDataApi({ eventId });
      setParticipantsData(response);
    } catch (error) {
      console.error("Error fetching participants data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const ageDistribution = {
    percentages: {
      "0-18":
        Number(participantsData?.participantsByAge?.["0-18"]?.percentage) || 0,
      "19-29": [
        Number(participantsData?.participantsByAge?.["18-19"]?.percentage) || 0,
        Number(participantsData?.participantsByAge?.["20-24"]?.percentage) || 0,
        Number(participantsData?.participantsByAge?.["25-29"]?.percentage) || 0,
      ].reduce((acc, curr) => acc + curr, 0),
      "30-39":
        Number(participantsData?.participantsByAge?.["30-39"]?.percentage) || 0,
      "40-49":
        Number(participantsData?.participantsByAge?.["40-49"]?.percentage) || 0,
      "51+": [
        Number(participantsData?.participantsByAge?.["50-59"]?.percentage) || 0,
        Number(participantsData?.participantsByAge?.["60+"]?.percentage) || 0,
      ].reduce((acc, curr) => acc + curr, 0),
      Unknown:
        Number(participantsData?.participantsByAge?.unknown?.percentage) || 0,
    },
  };

  return (
    <div className="ml-4 sm:ml-8 sm:mr-20">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-4 sm:ml-8 max-sm:pr-4">
        {participantsData?.eventTitle}
      </h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-2xl font-medium ml-5 sm:ml-9">Participants</h1>
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 sm:ml-8 max-sm:mr-4 mt-6">
        <div className="col-span-1">
          {loading ? (
            <SkeletonComponent className="h-auto md:h-[36vh] rounded-3xl" />
          ) : (
            <CountCard count={participantsData?.totalTickets} />
          )}
        </div>{" "}
        <div className="col-span-1">
          {loading ? (
            <SkeletonComponent className="h-auto md:h-[36vh] rounded-3xl" />
          ) : (
            <FollowerPieChart
              heading={"Participants By Gender"}
              male={participantsData?.participantsByGender.male}
              female={participantsData?.participantsByGender.female}
              unknownGender={participantsData?.participantsByGender.unknown}
            />
          )}
        </div>{" "}
        <div className="col-span-1">
          {loading ? (
            <SkeletonComponent className="h-auto md:h-[36vh] rounded-3xl" />
          ) : (
            <FollowerPieChart
              heading={"Participants By Age"}
              ageDistribution={ageDistribution}
            />
          )}
        </div>{" "}
        <div className="col-span-1">
          {loading ? (
            <SkeletonComponent className="h-auto md:h-[36vh] rounded-3xl" />
          ) : (
            <NewReturningCustomerPie
              returning={participantsData?.newVsReturning?.returning}
              newCustomer={participantsData?.newVsReturning.new}
            />
          )}
        </div>
      </div>
      <div className="mt-10 sm:ml-4">
        <h1 className="text-2xl font-medium ml-8">Participants List</h1>
        <ParticipantsTable
          participants={participantsData?.participants || []}
        />
      </div>
    </div>
  );
};

export default Participants;
