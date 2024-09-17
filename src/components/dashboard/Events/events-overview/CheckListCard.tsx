interface Checklist {
  atLeastOneTicket: boolean;
  eventLive: boolean;
  connectRepNetwork: boolean;
  promoCodeCreated: boolean;
  trackingLinkCreated: boolean;
}

interface CheckListCardProps {
  eventOverviewData?: Checklist; 
}

const CheckListCard: React.FC<CheckListCardProps> = ({ eventOverviewData }) => {
  const questionList = [
    {
      description: "Create at least one ticket type*",
      key: "atLeastOneTicket",
    },
    { description: "Set your event live*", key: "eventLive" },
    { description: "Connect your rep event", key: "connectRepNetwork" },
    { description: "Create a promo code", key: "promoCodeCreated" },
    { description: "Create a tracking link", key: "trackingLinkCreated" },
  ];

  return (
    <div className="flex flex-col border p-4 rounded-3xl min-w-[300px] md:w-[520px] xl:w-full 2xl:w-[520px] cursor-pointer bg-[#eeedf3] h-[275px]">
      <div className="text-center">
        <h3 className="text-lg">Check list</h3>
      </div>
      <div className="p-2">
        <ol className="list-decimal list-inside">
          {questionList.map((question) => {
            const isCompleted =
              eventOverviewData?.[question.key as keyof Checklist] || false;

            return (
              <div
                className="flex justify-between border-b border-gray-300 py-2"
                key={question.key}
              >
                <li>
                  <span className="pl-4 text-black">
                    {question.description}
                  </span>
                </li>
                <span className={`text-${isCompleted ? "green" : "red"}-500`}>
                  {isCompleted ? "✔️" : "❌"}
                </span>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default CheckListCard;
