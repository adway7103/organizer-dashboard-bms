import { Search } from "lucide-react";
import MessageComponent from "./MessageComponent";
import { MessageComponentData } from "./MessageComponent";
import { useState } from "react";

const messageComponentData: MessageComponentData[] = [
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
  {
    dp: "https://images.unsplash.com/photo-1511804074-5e57bc14db9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcGVyfGVufDB8fDB8fHww",
    name: "Darlene Robertson",
    status: "Darlene Robertson is typing...",
    time: "1 week ago",
  },
];

interface MessagesListProps {
  onMessageClick: () => void;
}

const MessagesList = ({ onMessageClick }: MessagesListProps) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    number | null
  >(null);

  const handleMessageClick = (index: number) => {
    setSelectedMessageIndex(index);
    onMessageClick();
  };

  return (
    <div className="border rounded-l-3xl p-6 min-w-[442px] xl:w-auto  bg-[#f8f8f8]">
      {/* hidden md:block */}
      <div className=" font-semibold text-[1.2rem] sm:text-[1.5rem]">
        Message (24)
      </div>
      <div className="relative grid grid-cols-2 sm:grid-cols-12 gap-8 items-center w-full sm:w-auto mt-4 overflow-hidden">
        <div className="col-span-7 sm:col-span-9">
          <div className="w-[286.3px] sm:w-auto">
            <Search className="absolute left-4 top-1 !bg-[#e4e0df] rounded-full text-gray-400 pointer-events-none items-center" />
            <input
              className="w-full sm:h-auto !pl-14 !h-8 !rounded-full !bg-[#e4e0df] border-none focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Search"
            />
          </div>
        </div>
        <div className="hidden sm:block sm:col-span-3">logo</div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="border rounded-3xl px-3 sm:px-4 sm:py-1 text-white bg-[#61769a]">
          All
        </button>
        <button className="border rounded-3xl px-3 sm:px-4 bg-white text-[#61769a] shadow-md">
          Unread
        </button>
      </div>
      <div className="mt-4">
        {messageComponentData.map((data, index) => (
          <MessageComponent
            key={index}
            {...data}
            isSelected={index === selectedMessageIndex}
            onClick={() => handleMessageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
