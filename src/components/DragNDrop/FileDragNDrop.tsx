import React, { useState, useRef, useEffect } from "react";
import "./FileDragNDrop.css";
import { MdUpload, MdDeleteForever } from "react-icons/md";
import { uploadImage } from "../../api/uploadImage";
import { useEventContext } from "../../Contexts/CreateEventContext";

interface FileDragNDropProps {
  onFileSelect: (file: File | null) => void;
  ClassName?: string;
  posterUrl?: string;
  setProfileData?: any;
}

const FileDragNDrop: React.FC<FileDragNDropProps> = ({
  onFileSelect,
  ClassName = "",
  posterUrl,
  setProfileData,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const { setEventInfo } = useEventContext();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImagePreview(URL.createObjectURL(file));
    onFileSelect(file);

    try {
      const imageUrl = await uploadImage(file);
      setEventInfo((prevEventInfo) => ({
        ...prevEventInfo,
        posterUrl: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const deleteImg = () => {
    setImagePreview(null);
    onFileSelect(null);

    if (setProfileData) {
      setProfileData({ logoUrl: "" });
    }
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      posterUrl: "",
    }));
  };

  useEffect(() => {
    if (posterUrl && posterUrl.trim() !== "") {
      setImagePreview(posterUrl);
    }
  }, [posterUrl]);

  return (
    <div>
      <div
        className={`drop-zone flex items-center justify-center ${ClassName}`}
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
            <p className="text-xs">
              Drag-drop or click here to choose an image.
            </p>
            <input
              type="file"
              name="image"
              id="image"
              hidden
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              ref={fileInputRef}
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
    </div>
  );
};

export default FileDragNDrop;
