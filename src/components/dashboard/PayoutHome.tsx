import ArCharPayout from "./PayOut/ArCharPayout";

import { TableP } from "./PayOut/TableP";
function PayoutHome() {
  return (
    <div className="">
      <h1 className="text-3xl mx-12 font-semibold">Payouts</h1>
      <div className="grid grid-cols-2 w-full justify-between gap-10">
        <ArCharPayout color="#25CD2599"/>
        <ArCharPayout color="#DB303099" />
      </div>
      <TableP />
    </div>
  );
}

export default PayoutHome;
