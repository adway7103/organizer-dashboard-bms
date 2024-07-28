import React, { DragEvent, useEffect, useState } from "react";
import "./FileDragNDrop.css";
import { MdUpload, MdDeleteForever } from "react-icons/md";
import { useEventContext } from "../../Contexts/CreateEventContext";
import axios from "axios";

const FileDragNDrop: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { eventInfo, setEventInfo } = useEventContext();
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const deleteImg = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url; // URL returned by the backend
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        setEventInfo((prevEventInfo) => ({
          ...prevEventInfo,
          posterUrl: imageUrl,
        }));
      }
    }

    // Handle the rest of the form submission logic here
  };

  useEffect(() => {
    if (eventInfo.posterUrl) {
      setImagePreview(eventInfo.posterUrl);
    }
  }, [eventInfo.posterUrl]);

  return (
    <div>
      <div
        className="drop-zone flex items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!imagePreview ? (
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
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <>
            <div className="event-image-preview">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Event-Image"
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <div className="delete-btn text-5xl" onClick={deleteImg}>
              <MdDeleteForever />
            </div>
          </>
        )}
      </div>
      <button onClick={handleFormSubmit} className="submit-btn">
        Create Event
      </button>
    </div>
  );
};

export default FileDragNDrop;
