import React, { useState, useRef } from "react";
import "./FileDragNDrop.css";
import { MdUpload, MdDeleteForever } from "react-icons/md";
import { uploadImage } from "../../api/uploadImage";

interface VideoComponentProps {
  onFileSelect: (file: File | null) => void;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  onFileSelect,
  setTrailerUrl,
}) => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
    onFileSelect(file);

    setUploading(true);
    setUploadError(null);
    try {
      const contentUrl = await uploadImage(file);
      setTrailerUrl((prevUrls) => [...prevUrls, contentUrl]);
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteVideo = () => {
    setVideoPreview(null);
    setTrailerUrl((prevUrls) => prevUrls.filter(url => url !== videoPreview));
    onFileSelect(null);
};

  return (
    <div>
      <div
        className={`drop-zone flex items-center justify-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!videoPreview ? (
          <label
            htmlFor="video"
            className="flex flex-col items-center justify-center gap-y-2"
          >
            <span className="bg-black opacity-50 text-white p-1">
              <MdUpload style={{ fontSize: "3.3rem" }} />
            </span>
            <h3 className="text-xl font-semibold text-center">Event Stories</h3>
            <p className="text-xs text-center">
              Drag-drop or click here to choose a video.
            </p>
            <input
              type="file"
              name="video"
              id="video"
              hidden
              accept="video/mp4, video/avi, video/webm, video/mkv"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
        ) : (
          <>
            <div className="event-video-preview">
              <video
                src={videoPreview}
                controls
                className="object-contain w-full h-[40vh]"
              />
            </div>
            <div className="delete-btn text-5xl" onClick={deleteVideo}>
              <MdDeleteForever />
            </div>
            {uploading && (
              <p className="text-xs text-center">Uploading video...</p>
            )}
            {uploadError && (
              <p className="text-xs text-center text-red-500">{uploadError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
