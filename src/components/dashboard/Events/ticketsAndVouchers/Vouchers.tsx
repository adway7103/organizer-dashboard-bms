import { Link } from "react-router-dom";
import { VoucherTable } from "../ticketsAndVouchers/VoucherTable";

const Vouchers = () => {
  return (
    <div className="sm:ml-8 sm:mr-24">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">Rhythem Live</h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-xl font-medium ml-8 ">Vouchers</h1>
        <Link
          to={"/create-promocode"}
          className="bg-[#d3c282] px-4 sm:px-10 py-2 rounded-full flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Promo code
        </Link>
      </div>{" "}
      <VoucherTable />
    </div>
  );
};

export default Vouchers;
