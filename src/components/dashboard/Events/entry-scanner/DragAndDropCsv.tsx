import React, { useState, useRef } from "react";
import "../../../DragNDrop/FileDragNDrop.css";
import { MdUpload, MdDeleteForever } from "react-icons/md";

const FileDragNDrop = () => {
  const [filePreview, setFilePreview] = useState<string | null>(null); // To handle file preview (file name)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setFilePreview(file.name); // Show the file name
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];    
    if (file) {
      setFilePreview(file.name); // Show the file name
    }
  };

  const deleteFile = () => {
    setFilePreview(null);
    fileInputRef.current!.value = ""; // Clear the file input
  };

  return (
    <div>
      <div
        className={`mt-4 rounded-2xl h-[200px] border-2 p-10 flex items-center justify-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!filePreview ? (
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center gap-y-2"
          >
            <span className="bg-black opacity-50 rounded-full text-white p-1">
              <MdUpload style={{ fontSize: "3.3rem" }} />
            </span>
            <h3 className="sm:text-lg font-medium">Upload CSV</h3>
            <p className="text-center text-xs">Drag CSV here or browse</p>
            <input
              type="file"
              name="file"
              id="file"
              hidden
              accept=".csv"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
        ) : (
          <div className="file-preview-wrapper flex items-center gap-4">
            <div className="file-preview">
              <p className="font-medium text-lg">{filePreview}</p> {/* Display file name */}
            </div>
            <div
              className="delete-btn text-2xl cursor-pointer"
              onClick={deleteFile}
            >
              <MdDeleteForever />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDragNDrop;
