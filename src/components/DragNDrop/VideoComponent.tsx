import React, { useState, useRef, useEffect } from "react";
import { MdUpload, MdDeleteForever } from "react-icons/md";
import { uploadImage } from "../../api/uploadImage";

interface VideoComponentProps {
  index: number; // Add index prop
  onFileSelect: (file: File | null, index: number) => void; // Pass index to onFileSelect
  setTrailerUrl: React.Dispatch<React.SetStateAction<string[]>>;
  videoUrl?: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  index,
  onFileSelect,
  setTrailerUrl,
  videoUrl,
}) => {
  console.log(videoUrl);
  
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
    onFileSelect(file, index); // Pass index to onFileSelect

    setUploading(true);
    setUploadError(null);
    try {
      const contentUrl = await uploadImage(file); // This should return the URL of the uploaded video
      setTrailerUrl((prevUrls) => {
        const updatedUrls = [...prevUrls];
        updatedUrls[index] = contentUrl; // Correct index is updated here
        return updatedUrls;
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (videoUrl) {
      setVideoPreview(videoUrl);
    }
  }, [videoUrl]);

  const deleteVideo = () => {
    setVideoPreview(null);
    setTrailerUrl((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls[index] = ""; // Clear specific index
      return updatedUrls;
    });
    onFileSelect(null, index); // Clear file selection for the given index
  };

  const deleteButton = videoPreview ? "block" : "hidden";

  return (
    <div className="">
      <div
        className={`relative h-[24vh] md:h-[34vh] lg:h-[46vh] border aspect-w-16 aspect-h-9 flex items-center justify-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!videoPreview ? (
          <label
            htmlFor={`video-${index}`} // Unique ID per component
            className="absolute inset-0 flex flex-col items-center justify-center gap-y-2"
          >
            <span className="bg-black opacity-50 text-white p-1">
              <MdUpload className="text-[3.3rem] sm:text-[3.3rem]" />
            </span>
            <h3 className="text-xl font-medium text-center">Event Stories</h3>
            <input
              type="file"
              name={`video-${index}`} // Unique name per input
              id={`video-${index}`} // Unique ID per input
              hidden
              accept="video/mp4, video/avi, video/webm, video/mkv"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
        ) : (
          <div>
            <div className={`absolute inset-0`}>
              <video
                src={videoPreview}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`delete-btn text-sm items-center justify-center flex cursor-pointer ${deleteButton}`}
        onClick={deleteVideo}
      >
        Delete
        <MdDeleteForever />
      </div>
      {uploading && <p className="text-xs text-center">Uploading video...</p>}
      {uploadError && (
        <p className="text-xs text-center text-red-500 ">{uploadError}</p>
      )}
    </div>
  );
};

export default VideoComponent;
