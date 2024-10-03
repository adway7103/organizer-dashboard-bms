import FollowerPieChart from "./ParticipantsByAge";
import CountCard from "./Count";
import { ParticipantsTable } from "./ParticipantsTable";
import NewReturningCustomerPie from "./NewReturningPie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchParticipantsDataApi } from "../../../../api/fetchParticipantsDataApi";

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
    female: ParticipantStats;
    male: ParticipantStats;
    unknown: ParticipantStats;
  };
  participantsByAge: AgeDistribution;
  newVsReturning: NewVsReturning;
  participants: any[]; // Replace 'any' with a more specific type if you have participant details
}

const Participants = () => {
  const { eventId } = useParams();

  const [participantsData, setParticipantsData] =
    useState<ParticipantsDashboardResponse | null>(null);

  const fetchData = async () => {
    const response = await fetchParticipantsDataApi({ eventId });
    setParticipantsData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const ageDistribution = {
    counts: {
      "0-18": participantsData?.participantsByAge?.["0-18"]?.num || 0,
      "19-29":
        (participantsData?.participantsByAge?.["18-19"]?.num || 0) +
        (participantsData?.participantsByAge?.["20-24"]?.num || 0) +
        (participantsData?.participantsByAge?.["25-29"]?.num || 0),
      "30-39": participantsData?.participantsByAge?.["30-39"]?.num || 0, // Separated "30-39"
      "40-49": participantsData?.participantsByAge?.["40-49"]?.num || 0,
      "51+":
        (participantsData?.participantsByAge?.["50-59"]?.num || 0) +
        (participantsData?.participantsByAge?.["60+"]?.num || 0),
      Unknown: participantsData?.participantsByAge?.unknown?.num || 0,
    },
    percentages: {
      "0-18": `${
        participantsData?.participantsByAge?.["0-18"]?.percentage || "0"
      }%`,
      "19-29": `${
        (participantsData?.participantsByAge?.["18-19"]?.percentage || 0) +
        (participantsData?.participantsByAge?.["20-24"]?.percentage || 0) +
        (participantsData?.participantsByAge?.["25-29"]?.percentage || 0)
      }%`,
      "30-39": `${
        participantsData?.participantsByAge?.["30-39"]?.percentage || 0
      }%`, // Separated "30-39"
      "40-49": `${
        participantsData?.participantsByAge?.["40-49"]?.percentage || 0
      }%`,
      "51+": `${
        (participantsData?.participantsByAge?.["50-59"]?.percentage || 0) +
        (participantsData?.participantsByAge?.["60+"]?.percentage || 0)
      }%`,
      Unknown: `${
        participantsData?.participantsByAge?.unknown?.percentage || "0"
      }%`,
    },
  };

  return (
    <div className="ml-4 sm:ml-8 sm:mr-20">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-4 sm:ml-8 max-sm:pr-4">
        {participantsData?.eventTitle}
      </h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-2xl font-medium ml-9 ">Participants</h1>
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 sm:ml-8 max-sm:mr-4 mt-6">
        <div className="col-span-1">
          <CountCard count={participantsData?.totalTickets} />
        </div>{" "}
        <div className="col-span-1">
          <FollowerPieChart
            heading={"Participants By Gender"}
            male={participantsData?.participantsByGender.male}
            female={participantsData?.participantsByGender.female}
            unknownGender={participantsData?.participantsByGender.unknown}
          />
        </div>{" "}
        <div className="col-span-1">
          <FollowerPieChart
            heading={"Participants By Age"}
            ageDistribution={ageDistribution}
          />{" "}
        </div>{" "}
        <div className="col-span-1">
          <NewReturningCustomerPie
            returning={participantsData?.newVsReturning?.returning}
            newCustomer={participantsData?.newVsReturning.new}
          />
        </div>{" "}
      </div>
      <div className="mt-10 sm:ml-4">
        <h1 className="text-2xl font-medium ml-8">Participants List</h1>
        <ParticipantsTable />
      </div>
    </div>
  );
};

export default Participants;
