import HomeContainerCard from "../HomeContainerCard";

interface CountCardType {
  heading: string;
  count: string;
}

const CountCard = ({ heading, count }: CountCardType) => {
  return (
    <HomeContainerCard className="h-[22vh] shadow-none border border-gray-300 rounded-3xl ml-8">
      <div className="py-5 m-4">
        <div className="flex px-5 items-center">
          <div className="h-10 w-10 rounded-full bg-yellow-500 "></div>
          <p className=" font-semibold text-xl pl-2">{heading}</p>
        </div>
        <div className="flex justify-center text-[2rem] font-bold ">
          {count}
        </div>
      </div>
    </HomeContainerCard>
  );
};

export default CountCard;
