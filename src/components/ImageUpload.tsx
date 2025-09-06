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
      <UploadDropzone
        className="w-full !h-15"
        appearance={{
          uploadIcon: {
            width: "60px",
            height: "60px",
            marginTop: "20px",
          },
          button: {
            display: "flex",
            opacity: "1",
            visibility: "visible",
            cursor: "pointer",
            color: "#ffffff", // 白色文字
            backgroundColor: "#3b82f6", // 蓝色背景
            border: "1px solid #e5e7eb", // 浅灰色边框
            borderRadius: "6px", // 圆角
            padding: "8px 16px", // 内边距
            fontSize: "14px", // 字体大小
            fontWeight: "500", // 字体粗细
            marginBottom: "10px", // 下边距
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
          
          if (res && res[0]?.ufsUrl) {
            console.log('calling onChange');
            onChange(res[0].ufsUrl);
          }
        }}
        

        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name)
        }}

        onDrop={(acceptedFiles) => {
          console.log("📁 Files dropped:", acceptedFiles);
        }}
        onBeforeUploadBegin={(files) => {
          console.log("🔍 Before upload begin:", files);
          return files;
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default ImageUpload;