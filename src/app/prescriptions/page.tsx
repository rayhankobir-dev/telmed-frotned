"use client";
import React, { useState } from "react";

function Prescription() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle dialog open/close
  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  // Handle prescription upload and API call
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a prescription image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://detect.roboflow.com/automation-of-doctors-prescription-s-image-2/1?api_key=uATkLzHtsidA93jhazpg&confidence=40&overlap=30&format=json",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("An error occurred while uploading the prescription.");
    }
  };

  return (
    <div>
      <div
        className="cursor-pointer border p-4 rounded-md bg-gray-200"
        onClick={handleDialogToggle}
      >
        Upload Prescription
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-96">
            <h3 className="text-xl mb-4">Upload Prescription</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
              accept="image/*"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload
              </button>
              <button
                onClick={handleDialogToggle}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        {result && (
          <div className="border p-4 bg-gray-100 rounded-md">
            <h4 className="font-semibold">Result:</h4>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prescription;
