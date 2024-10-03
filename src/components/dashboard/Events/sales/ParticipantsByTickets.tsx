import HomeContainerCard from "../../HomeContainerCard";
import SalesPieChart from "./SalesPie";

// import img from "../../../../public/affiliates/image.png";
// import yellow from "../../../../public/affiliates/yellow.png";
// import blue from "../../../../public/affiliates/blue.png";
// import purple from "../../../../public/affiliates/purple.png";

interface TicketData {
  count?: number;
  percentage?: string;
}

interface ParticipantsByTicketsProps {
  ticketData?: Record<string, TicketData>;
}

const ParticipantsByTickets = ({ ticketData }: ParticipantsByTicketsProps) => {
  const ticketEntries = Object.entries(ticketData || {});

  const chartData = ticketEntries.map(([ticketName, ticketInfo], index) => ({
    name: ticketName,
    percentage: parseFloat(ticketInfo?.percentage || "0"),
    fill: ["#0088FE", "#000000", "#FFBB28", "#800080"][index % 4],
  }));

  return (
    <HomeContainerCard className="h-auto border border-gray-300 rounded-3xl w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="font-medium text-xl pt-4">
          Participants By Tickets
        </div>
      </div>
      <div className="flex flex-col sm:flex-row max-sm:pb-4 justify-center items-center">
        <div className="pt-6">
          <SalesPieChart data={chartData} />
        </div>
        <div className="max-sm:pl-6 pr-6 space-y-2">
          {ticketEntries.map(([ticketName, ticketInfo]) => (
            <div key={ticketName} className="flex gap-2 justify-between">
              <p>{ticketName}</p>
              <p>{ticketInfo?.count || "0"} </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default ParticipantsByTickets;
