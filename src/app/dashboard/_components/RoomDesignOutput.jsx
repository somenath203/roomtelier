'use client';

import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import AiImgOutputAlertDialog from "./AiImgOutputAlertDialog";
import { useState } from "react";


const RoomDesignOutput = ({ roomDesignData }) => {

  const [ openAiGeneratedImgDialog, setOpenAiGeneratedImgDialog ] = useState(false);

  const onOpenAlertDialogToDownloadGeneratedImg = () => {

    setOpenAiGeneratedImgDialog(true);
    
  };

  return (
    <div
      className="shadow-md rounded-md hover:cursor-pointer"
      onClick={onOpenAlertDialogToDownloadGeneratedImg}
    >

      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: roomDesignData?.originalImageUrl,
        }}
        secondImage={{
          imageUrl: roomDesignData?.generatedAiImageUrl,
        }}
      />

      <div className="p-4">

        <h2>🏡Room Type : {roomDesignData?.roomType}</h2>

        <h2>🎨 Design Type : {roomDesignData?.designType}</h2>

      </div>

      <AiImgOutputAlertDialog
        openAIOutputDialog={openAiGeneratedImgDialog}
        setOpenAIOutputDialog={setOpenAiGeneratedImgDialog}
        inputImgUrl={roomDesignData?.originalImageUrl}
        generatedAiImgUrl={roomDesignData?.generatedAiImageUrl}
      />

    </div>
  );
};

export default RoomDesignOutput;
