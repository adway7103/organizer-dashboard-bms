import { VoucherTable } from "../ticketsAndVouchers/VoucherTable";
import AddVoucher from "./AddVoucher";

const Vouchers = () => {
  return (
    <div className="sm:ml-8 sm:mr-24">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">Rhythem Live</h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-xl font-medium ml-8 ">Vouchers</h1>
        <AddVoucher />
      </div>{" "}
      <VoucherTable />
    </div>
  );
};

export default Vouchers;
