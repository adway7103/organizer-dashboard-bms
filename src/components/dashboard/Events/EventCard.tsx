interface EventCardProps {
  title: string;
  posterUrl: string;
  city: string;
  date: string;
  time: string;
  revenue: string;
  ticketsSold: string;
  onClick: () => void;
}

const EventCard = ({
  title,
  posterUrl,
  city,
  date,
  time,
  revenue,
  ticketsSold,
  onClick,
}: EventCardProps) => {
  
  return (
    <div  onClick={onClick} className="flex flex-col md:flex-row items-center md:items-start border rounded-3xl p-4 space-x-0 md:space-x-6 min-w-[300px] w-full sm:w-[300px] md:w-[565px] mr-8 sm:mr-0 cursor-pointer">
      <div>
        <img src={posterUrl} alt="" className="h-[230px] w-[230px]" />
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-[#a28a02] text-center md:text-start">
          {title}
        </h1>
        <div className="flex text-[#787878] space-x-4 text-sm mt-1 justify-center md:justify-start ">
          <div className="flex">
            <div className="pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
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
            {city}
          </div>
          <div className="flex">
            <div className="pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            {time}
          </div>
        </div>
        <div className="pl-2 mt-1 text-black text-center md:text-start">
          <p className="text-sm">{date}</p>
        </div>
        <div className="flex space-x-1 mt-2 text-sm">
          <div className="border bg-[#ededed] px-4 py-1 rounded-full">
            <div className="flex gap-1">
              Edit
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="border bg-[#ededed] px-4 py-1 rounded-full">
            <div className="flex gap-1">
              Traffic
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="border bg-[#ededed] px-4 py-1 rounded-full">
            <div className="flex gap-1">
              Track
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-white text-lg space-x-2 mt-3">
          <div className="border bg-[#000000] px-8 py-1">Preview</div>
          <div className="border bg-[#954b7c] px-8 py-1">Text Blast</div>
        </div>
        <div className="flex justify-between border-t mt-3 pt-1 text-sm">
          <p>Revenue</p>
          <p>$ {revenue}</p>
        </div>
        <div className="flex justify-between pt-1 text-sm">
          <p>Tickets Sold</p>
          <p>{ticketsSold}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
