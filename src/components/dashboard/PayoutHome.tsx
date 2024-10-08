import ArCharPayout from "./PayOut/ArCharPayout";
import { TableP } from "./PayOut/TableP";

function PayoutHome() {
  return (
    <div className="ml-4 sm:ml-8 min-w-[300px]">
      <h1 className="font-medium text-[2rem] pl-4">Payouts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-3 pr-4 sm:mr-8">
        <div className="lg:col-span-1">
          <ArCharPayout color="#25CD2599" heading="Total tickets sold"/>
        </div>
        <div className="lg:col-span-1">
          <ArCharPayout color="#DB303099" heading="Revenue earned"/>
        </div>
      </div>
      <TableP />
    </div>
  );
}

export default PayoutHome;
