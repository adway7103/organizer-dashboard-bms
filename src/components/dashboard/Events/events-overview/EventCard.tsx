const EventCard = ({ posterUrl, city, date, day, time }: any) => {
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start border p-8 rounded-3xl space-x-0 sm:space-x-8 min-w-[300px] sm:w-[520px] cursor-pointer bg-[#ffffff]">
      <div>
        <img src={posterUrl} alt="" className="h-[210px] w-[280px] object-cover rounded-lg" />
      </div>
      <div className="pt-4">
        <div className="text-lg mt-1">
          <div className="flex items-center text-[#787878]">
            <div className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            {city}{" "}
          </div>
          <div className="flex items-center text-[#4e4e4e]">
            <div className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            {time}{" "}
          </div>
        </div>
        <div className="mt-1 text-black text-center md:text-start">
          <p className="text-lg text-[#4e4e4e]">
            {date}, {day}
          </p>
        </div>
        <div className="flex space-x-1 mt-2 text-sm">
          <div className="border bg-[#6076a0] text-white px-8 py-1">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
