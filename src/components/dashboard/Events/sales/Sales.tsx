import img from "../../../../../public/event/money.png";
import img1 from "../../../../../public/sales/Group.png";
import img2 from "../../../../../public/sales/Payments - iconSvg.co.png";
import img3 from "../../../../../public/sales/image.png";
import { SalesTable } from "./SalesTable";
import ParticipantsByAge from "./ParticipantsByAge";
import SalesOverTime from "./SalesChart";
const Sales = () => {
  return (
    <>
      <h1 className="text-3xl text-[#9d487b] font-medium ml-16">
        Rhythem Live
      </h1>
      <div className="ml-12 mt-6">
        <h1 className="text-2xl font-medium ml-6">Sales</h1>
      </div>{" "}
      <div className="bg-[#f8f8f8] ml-2 sm:ml-8 md:ml-6 mr-2 2xl:mr-8 rounded-3xl pt-6 mt-4">
        <div className="ml-4 mr-4 md:ml-12 md:mr-24 grid gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
          <Card heading={"Net revenue"} icon={img} />
          <Card heading={"Ticket revenue"} icon={img} />
          <Card heading={"Total numbers of orders"} icon={img1} />
          <Card heading={"Rep payments"} icon={img2} />
          <Card heading={"Ticket sold"} icon={img3} />
          <Card heading={"Tickets transferred"} icon={img3} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ml-4 mr-4 md:ml-12 md:mr-24 gap-4 mt-6">
          <ParticipantsByAge />
          <SalesOverTime />
        </div>
        <div className="md:ml-8 md:mr-16 md:pr-4">
          <h1 className="ml-8 mt-10 text-2xl font-medium">Orders</h1>
          <SalesTable />
        </div>
      </div>
    </>
  );
};

export default Sales;

const Card = ({ heading, icon }: any) => {
  return (
    <div className="border rounded-3xl w-full">
      <div className="flex ml-8 items-center p-4 gap-4">
        <div>
          <img src={icon} alt="" className="size-8" />
        </div>
        <div className="">
          <div className="text-lg">{heading}</div>
          <div>$ 10010</div>
        </div>
      </div>
    </div>
  );
};
