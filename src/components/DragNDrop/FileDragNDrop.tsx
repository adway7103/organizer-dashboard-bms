import React, { DragEvent, useEffect } from "react";
import "./FileDragNDrop.css";
import { MdUpload } from "react-icons/md";
import { useEventContext } from "../../Contexts/CreateEventContext";

const FileDragNDrop: React.FC = () => {
  const { eventInfo, setEventInfo } = useEventContext();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      image: file,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        image: file,
      }));
    }
  };

  useEffect(() => {
    if (eventInfo.image) {
      console.log(eventInfo.image);
    }
  }, [eventInfo.image]);

  return (
    <div
      className="drop-zone flex items-center justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="image" className="flex flex-col items-center justify-center gap-y-2">
        <span className="bg-black opacity-50 text-white p-1">
          <MdUpload style={{ fontSize: "3.3rem" }} />
        </span>
        <h3 className="text-xl font-semibold">Event Image</h3>
        <p>Drag-drop or click here to choose an image.</p>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          required
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileDragNDrop;
