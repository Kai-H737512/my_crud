import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import React from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({endpoint, value, onChange}: ImageUploadProps)  {

  
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <UploadDropzone<OurFileRouter, "postImage">
        className="w-full !h-15"
        appearance={{
          uploadIcon: {
            width: "60px",
            height: "60px",
            marginTop: "30px",
          },
          container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        

        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name)
        }}

        onDrop={(acceptedFiles, fileRejections) => {
          console.log("📁 Files dropped:", acceptedFiles);
          console.log("❌ File rejections:", fileRejections);
        }}
        onBeforeUploadBegin={(files) => {
          console.log("🔍 Before upload begin:", files);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;