import ArCharPayout from "./PayOut/ArCharPayout";
import { TableP } from "./PayOut/TableP";

function PayoutHome() {
  return (
    <div className="pl-8">
      <h1 className="font-semibold text-[2rem] pl-4">Payouts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mr-12">
        <div className="lg:col-span-1">
          <ArCharPayout color="#25CD2599" />
        </div>
        <div className="lg:col-span-1">
          <ArCharPayout color="#DB303099" />
        </div>
      </div>
      <TableP />
    </div>
  );
}

export default PayoutHome;
