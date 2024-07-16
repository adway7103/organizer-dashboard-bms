export interface MessageComponentData {
  dp: string;
  name: string;
  status: string;
  time: string;
}
interface MessageComponentProps extends MessageComponentData {
  isSelected: boolean;
  onClick: () => void;
}

const MessageComponent = ({
  dp,
  name,
  status,
  time,
  isSelected,
  onClick,
}: MessageComponentProps) => {
  return (
    <div
      className={`w-full py-6 px-4 border-t  cursor-pointer ${
        isSelected ? "bg-[#dadee7] rounded-3xl" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-6">
        <div className="">
          <img src={dp} alt="" className="rounded-full h-12 w-12" />
        </div>
        <div className="">
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-xs">{status}</div>
        </div>
        <div>
          <div className="text-xs ml-10">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
