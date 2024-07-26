import HomeContainerCard from "../HomeContainerCard";
import img from "../../../../public/dashboard/payout.png";

function Payouts() {
  return (
    <HomeContainerCard className="h-auto sm:h-[50vh] w-auto bg-gray-200 py-4 sm:py-0 sm:flex sm:flex-col sm:p-6 sm:space-y-4 rounded-3xl">
      <div className="flex gap-1 items-center">
        <img
          src={img}
          alt=""
          className="hidden sm:block p-2 h-10 w-10 border border-black rounded-full"
        />

        <h1 className="ml-8 sm:ml-0 text-lg">Payouts</h1>
      </div>

      <div className="flex max-sm:justify-around sm:flex-col sm:space-y-12">
        <div className="text-sm sm:text-lg sm:space-y-3">
          <p>Previous Payout</p>
          <div className="flex items-center justify-between">
            <h1 className="text-[1.2rem] sm:text-[2rem] font-semibold">
              $ 43,000
            </h1>
            <span className="text-xs lg:text-[1rem] px-3 py-1 bg-green-300 rounded-md text-green-600 max-sm:ml-4">
              paid
            </span>
          </div>
        </div>
        <div className="text-sm sm:text-lg sm:space-y-4">
          <p>Next Payout</p>
          <div className="flex items-center justify-between">
            <h1 className="text-[1.2rem] sm:text-[2rem] font-semibold">
              $ 80,000
            </h1>
            <span className="text-xs lg:text-[1rem] bg-red-200 px-3 py-1 text-red-600 rounded-md max-sm:ml-4">
              pending
            </span>
          </div>
        </div>
      </div>
    </HomeContainerCard>
  );
}

export default Payouts;
