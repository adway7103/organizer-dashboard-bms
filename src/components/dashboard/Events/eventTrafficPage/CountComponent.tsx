interface CountProps {
  icon: string;
  heading: string;
  count: string;
}

const CountComponent = ({ icon, heading, count }: CountProps) => {
  return (
    <div className="border rounded-3xl w-full bg-[#dfe4ea]">
      <div className="flex ml-6 items-center py-4 gap-6">
        <div>
          <img src={icon} alt="" className="" />
        </div>
        <div className="space-y-2">
          <div className="text-xl text-[#974d7e]">{heading}</div>
          <div className="text-lg">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default CountComponent;
