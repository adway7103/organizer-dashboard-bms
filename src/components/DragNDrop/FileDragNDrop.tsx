import React, { DragEvent, useEffect, useState } from "react";
import "./FileDragNDrop.css";
import { MdUpload, MdDeleteForever  } from "react-icons/md";
import { useEventContext } from "../../Contexts/CreateEventContext";

const FileDragNDrop: React.FC = () => {
  const [showImage, setShowImage] = useState(false);
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

  const deleteImg = () => {
    setEventInfo((prevEventInfo) => ({
     ...prevEventInfo,
      image: null,
    }));
  }

  useEffect(() => {
    if (eventInfo.image) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [eventInfo.image]);

  return (
    <div
      className="drop-zone flex items-center justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!showImage ? (
        <label
          htmlFor="image"
          className="flex flex-col items-center justify-center gap-y-2"
        >
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
      ) : (
        <>
          <div className="event-image-preview">
            <img
              src="https://navata.com/images/360x205_img4.jpg"
              alt="Event-Image"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="delete-btn text-5xl" onClick={deleteImg}>
            <MdDeleteForever />
          </div>
        </>
      )}
    </div>
  );
};

export default FileDragNDrop;
