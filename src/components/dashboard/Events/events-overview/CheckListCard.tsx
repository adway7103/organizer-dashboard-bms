const CheckListCard = () => {
  const questionList = [
    { description: "Create at least one ticket type*", key: 0 },
    { description: "Set your event live*", key: 1 },
    { description: "Connect your rep event", key: 2 },
    { description: "Create a promo code", key: 3 },
    { description: "Create a tracking link", key: 4 },
  ];
  return (
    <div className="flex flex-col border p-4 rounded-3xl  min-w-[300px] md:w-[480px] cursor-pointer bg-[#eeedf3] h-[275px]">
      <div className="text-center">
        <h3 className="text-lg">Check list</h3>
      </div>
      <div className="p-2">
      <ol className="list-decimal list-inside">
      {questionList.map((question) => {
            return <div className="flex justify-between border-b border-gray-300 py-2"><li key={question.key}><span className="pl-4 text-black">{question.description}</span></li><span>tick</span></div>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default CheckListCard;
