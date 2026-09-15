"use client";

import { useState } from "react";
import { ImageUp } from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const ImageSelectionInput = ({ imgOfRoomSelectedByUser }) => {


  const [roomImageInput, setRoomImageInput] = useState(null);


  const onFileSelect = (e) => {

    setRoomImageInput(e?.target?.files[0]);

    imgOfRoomSelectedByUser(e?.target?.files[0])

  };


  return (
    <div>

      <Label>Select image of your room <span className="text-red-500">*</span> </Label>

      {/* room image input field */}
      <div className="mt-3">

        {/* This is the clickable area where the user selects an image of their room. */}
        {/**
         * The <Label> is connected to the hidden file input through 'htmlFor="upload-image"'.
         * When the user clicks this label, the associated file input is automatically triggered.
         */}
         
        <Label htmlFor="upload-image">

          <div className="relative w-full h-full min-h-75 border rounded-xl border-dotted flex justify-center items-center border-primary bg-slate-200 hover:cursor-pointer hover:shadow-lg overflow-hidden">
            
            {roomImageInput ? (
              <Image
                src={URL.createObjectURL(roomImageInput)}
                alt="image input"
                fill
                className="object-cover"
              />
            ) : (
              <ImageUp size={45} />
            )}

          </div>

        </Label>

        <Input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelect}
        />

      </div>

    </div>
  );
};

export default ImageSelectionInput;
