"use client";
import Image from "next/image";
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import LoadFile from "./load-file";
import { useToast } from "@/components/ui/use-toast";


const Dropzone = ({ onFileDrop }: { onFileDrop: (files: File[]) => void }) => {
  const [selectedImage, setSelectedImage] = useState<
    (File & { preview: string })[]
  >([]);
  const [selectedFile, setSelectedFile] = useState<
    (File & { preview: string })[]
  >([]);
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const onDrop1 = useCallback((acceptedFiles: File[]) => {
    setSelectedImage((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFile((prevFiles) => {
      // Check if the total number of files would exceed the limit
      if (prevFiles.length + acceptedFiles.length > 1) {
        // If so, reject the new files and show an alert
        toast({
          title: "Error",
          description:"You can't upload more than 1 files!",
          variant: "destructive",
        });
        return prevFiles;
      } else {
        // If not, add the new files to the state
        const updatedFiles = [
          ...prevFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ];
        onFileDrop(updatedFiles); // Call the callback with selected files
        return updatedFiles;
      }
    });
  }, [toast, onFileDrop]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const fileNames = selectedFile.map((file, index) => {
    let Icon;
    if (file.type === "application/pdf") {
      Icon = FaFilePdf;
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      Icon = FaFileExcel;
    } else if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      Icon = FaFileWord;
    }

    return (
      <div key={index} className="flex gap-1 items-center">
        <div>{Icon && <Icon />}</div>
        <div className="w-44 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
          {file.name}
        </div>
      </div>
    );
  });

  const images = selectedImage.map((file, index) => {
    // Ensure file.preview is a string
    const preview = file.preview.toString();

    return (
      <div key={index}>
        <Image
          src={preview}
          alt={`Preview ${index}`}
          width={500}
          height={300}
        />
      </div>
    );
  });

  return (
    <div>
      <div className="inputUpload w-[400px] h-[92px] pl-[20px] text-[14px] font-normal leading-[20px]  flex items-center justify-start gap-14 relative ">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {fileNames.length > 0 ? (
            <div>{fileNames}</div>
          ) : (
            <p className="  text-sm font-normal leading-normal w-48 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
              Drag and drop files here...
            </p>
          )}
        </div>
        <Button
          className=" font-semibold w-[100px] h-[44px] absolute right-5"
          variant="outline"
          type="button"
          onClick={() => {
            if (selectedFile.length === 0) {
              toast({
                title: "Error",
                description:"Undefined errorPlease select a file before uploading!",
                variant: "destructive",
              });
            } else {
              setShowForm(true);
            }
          }}
        >
          <Image
            src="/Group (2).svg"
            alt="x"
            width={14}
            height={14}
            className="mr-2"
          />
          Upload
        </Button>
      </div>
      <div className="pt-5">
        {showForm && (
          // Your form goes here
          <LoadFile />
        )}
      </div>
    </div>
  );
};

export default Dropzone;
