import HomeContainerCard from "../HomeContainerCard";
import DTable from "./DTable";

function CurrentlyEvent() {
  return (
    <HomeContainerCard className="xl:h-[50vh] w-full px-6 py-5 border border-gray-300 rounded-3xl">
      <div className="flex w-full gap-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 border border-black rounded-full p-1 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

        <h1 className="text-lg font-medium">List of Live Events</h1>
      </div>

      <DTable />
    </HomeContainerCard>
  );
}

export default CurrentlyEvent;
