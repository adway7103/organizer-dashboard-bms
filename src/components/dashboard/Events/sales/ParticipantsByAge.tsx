import HomeContainerCard from "../../HomeContainerCard";
import SalesPieChart from "./SalesPie";

// import img from "../../../../public/affiliates/image.png";
// import yellow from "../../../../public/affiliates/yellow.png";
// import blue from "../../../../public/affiliates/blue.png";
// import purple from "../../../../public/affiliates/purple.png";

const ParticipantsByAge = () => {
  return (
    <HomeContainerCard className="h-auto border border-gray-300 rounded-3xl w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="font-semibold text-xl pt-4">Participants By Age</div>
      </div>
      <div className="flex flex-col sm:flex-row max-sm:pb-4 justify-center items-center">
        <div className="pt-6">
          <SalesPieChart />
        </div>
        <div className="pr-6">
          <div className="flex justify-between">
            <p>Round 2</p>
            <p>35 %</p>
          </div>
          <div className="flex justify-between">
            <p>Group ticket</p>
            <p>35 %</p>
          </div>
          <div className="flex justify-between">
            <p>Final round</p>
            <p>35 %</p>
          </div>
          <div className="flex justify-between">
            <p>Round 3</p>
            <p>35 %</p>
          </div>
          <div className="flex justify-between">
            <p>Limited (ST)</p>
            <p>35 %</p>
          </div>
          <div className="flex justify-between gap-6">
            <p>Trinity Indian Society member</p>
            <p>35 %</p>
          </div>
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default ParticipantsByAge;
