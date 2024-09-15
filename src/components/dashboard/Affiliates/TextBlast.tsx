import { useState } from "react";
import HomeContainerCard from "../HomeContainerCard";
import { textBlast } from "../../../api/textBlastApi";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  heading?: string;
}
const TextBlast = ({ className, heading }: Props) => {
  const [showTextBlastPopup, setShowTextBlastPopup] = useState<boolean>(false);

  const handleTextBlastClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTextBlastPopup(true);
  };

  const handleConfirmTextBlast = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTextBlastPopup(false);
    try {
      await textBlast();
      toast.success("Text blast sent successfully!");
    } catch (error) {
      toast.error("Failed to send text blast. Please try again.");
    }
  };

  const handleCancelTextBlast = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTextBlastPopup(false);
  };
  return (
    <div>
      <HomeContainerCard className="h-auto sm:h-[10vh] mt-4 shadow-none">
        <div
          className={`flex h-16 justify-center items-center pl-4 text-[1rem] border border-gray-700 rounded-full text-white cursor-pointer ${className}`}
          onClick={handleTextBlastClick}
        >
          {heading ? heading : "Send A Text Blast"}{" "}
        </div>
      </HomeContainerCard>

      {showTextBlastPopup && (
        <div
          className="fixed -inset-6 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCancelTextBlast}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Do you want to send a text blast?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleConfirmTextBlast}
                className="bg-[#244f7a] text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelTextBlast}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBlast;
console.log("a");
