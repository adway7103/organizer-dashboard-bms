import { useState } from "react";
import MessagesList from "./Messaging/MessagesList";

const MessagingHome = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleBackToList = () => {
    setIsMessageOpen(false);
  };

  const handleOpenMessage = () => {
    setIsMessageOpen(true);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 ml-2 md:ml-8 border rounded-3xl overflow-hidden">
      {!isMessageOpen && (
        <div className="col-span-1 lg:col-span-2 xl:col-span-2">
          <MessagesList onMessageClick={handleOpenMessage} />
        </div>
      )}
      {(isMessageOpen || window.innerWidth >= 1024) && (
        <div className="col-span-1 lg:col-span-2 xl:col-span-3 lg:min-w-[442px] xl:w-full">
          {window.innerWidth < 1024 && (
            <button onClick={handleBackToList} className="p-2">Back to List</button>
          )}
          <div className="">message open</div>
        </div>
      )}
    </div>
  );
};

export default MessagingHome;