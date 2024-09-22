import FollowerPieChart from "./ParticipantsByAge";
import CountCard from "./Count";
import { ParticipantsTable } from "./ParticipantsTable";
import NewReturningCustomerPie from "./NewReturningPie";

const Participants = () => {
  const ageDistribution: any = {
    counts: {
      "0-18": 50,
      "19-30": 120,
      "31-50": 80,
      "51+": 30,
      Unknown: 20,
    },
    percentages: {
      "0-18": "16.1%",
      "19-30": "38.7%",
      "31-50": "25.8%",
      "51+": "9.7%",
      Unknown: "6.5%",
    },
  };
  return (
    <div className="ml-4 sm:ml-8 sm:mr-20">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">Rhythem Live</h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-2xl font-medium ml-9 ">Participants</h1>
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 sm:ml-8 max-sm:mr-4 mt-6">
        <div className="col-span-1">
          <CountCard />
        </div>{" "}
        <div className="col-span-1">
          <FollowerPieChart
            heading={"Participants By Gender"}
            male={"50"}
            female={"100"}
            unknownFirstPie={"100"}
          />
        </div>{" "}
        <div className="col-span-1">
          <FollowerPieChart
            heading={"Participants By Age"}
            ageDistribution={ageDistribution}
          />{" "}
        </div>{" "}
        <div className="col-span-1">
          <NewReturningCustomerPie returningCustomer="35" newCustomer="65" />
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
