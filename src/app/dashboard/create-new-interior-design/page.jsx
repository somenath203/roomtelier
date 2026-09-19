"use client";

import { Sparkles } from "lucide-react";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import AdditionalRequirementInput from "./_components/AdditionalRequirementInput";
import ImageSelectionInput from "./_components/ImageSelectionInput";
import RoomDesignTypeInput from "./_components/RoomDesignTypeInput";
import RoomTypeInputField from "./_components/RoomTypeInputField";
import { createClient } from "@/lib/supabase/client";
import CustomLoader from "./_components/CustomLoader";
import AiImgOutputAlertDialog from "../_components/AiImgOutputAlertDialog";
import { UserDetailsContext } from "@/app/_context/userDetailsContext";


const Page = () => {


  const [ allUserInputs, setAllUserInputs ] = useState({});

  const [ outputData, setOutputData ] = useState({});

  const [ isOpenImgOutputDialogBox, setIsOpenImgOutputDialogBox ] = useState(false);

  const [ loading, setLoading ] = useState(false);

  const { setUserDetailsGlobalContext } = useContext(UserDetailsContext);


  const onHandleImageOfRoomSelectedByUser = (value, fieldName) => {

    {
      /**
       * Update the 'allUserInputs' state with the latest value
       * selected or entered by the user.
       *
       * 'prevValues' contains all the values that are already stored
       * in the state.
       *
       * We use '...prevValues' to keep all the previous values instead
       * of replacing the entire state.
       *
       * '[fieldName]: value' then adds a new field or updates an
       * existing field.
       *
       * Example:
       *
       * Suppose the current state is:
       *
       * {
       *   roomImageInput: "room.jpg"
       * }
       *
       * If the user selects "Bedroom", then:
       *
       * fieldName = "roomTypeInput"
       * value = "Bedroom"
       *
       * The new state becomes:
       *
       * {
       *   roomImageInput: "room.jpg",
       *   roomTypeInput: "Bedroom"
       * }
       *
       * This way, we keep the previous inputs and only add or update
       * the input that the user has just selected or entered.
       */
    }

    setAllUserInputs((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSaveImageInSupabase = async (imageFile) => {

    try {

      if(!imageFile) {

        throw new Error("Room image is required");

      }

      const supabaseClient = createClient();

      const uploadedImageFileExtension = imageFile?.name?.split(".")?.pop();

      const generatedUniqueFileName = `${crypto.randomUUID()}.${uploadedImageFileExtension}`;

      const filePath = `room-images/${generatedUniqueFileName}`;

      const { data, error } = await supabaseClient.storage
        .from("myimages")
        .upload(filePath, imageFile, {
          contentType: imageFile?.type,
          upsert: false, // Prevents an existing file from being overwritten if the same path already exists.
        });

      if (error) {

        console.error("Supabase upload error:", error);

        throw new Error("Failed to upload room image");

      }

      const { data: publicUrlOfTheUploadedImg } = supabaseClient.storage
        .from("myimages")
        .getPublicUrl(data?.path);

      return {
        uploadedImgUrl: publicUrlOfTheUploadedImg?.publicUrl,
        filePath: data?.path,
      };

    } catch (error) {

      console.log(error);

      throw error;

    }

  };


  const handleGenerateImageUsingAI = async () => {

    try {

      setLoading(true);

      const uploadRoomImageInSupabaseAndGetUrl = await handleSaveImageInSupabase(allUserInputs?.roomImageInput);

      const res = await axios.post("/api/redesign-room-ai", {
        allInputOfUser: {
          ...allUserInputs,
          roomImageInputURL: uploadRoomImageInSupabaseAndGetUrl?.uploadedImgUrl,
        },
      });

      if (res?.data?.success) {
        
        setOutputData(res?.data?.data);

        setUserDetailsGlobalContext(res?.data?.data?.updatedUserDetails); 
        // Update the global context with the user's complete, latest details.

        setIsOpenImgOutputDialogBox(true);

        toast.success('design generated successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

      }

    } catch (error) {

      console.log(error);

      setOutputData({});

      setIsOpenImgOutputDialogBox(false);

      toast.error(error?.response?.data?.error || error?.message || "Something went wrong while generating the room design", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } finally {

      setLoading(false);

    }

  };

  return (
    <div>

      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the magic of AI Remodelling
      </h2>

      <p className="text-center text-gray-500 mt-1">
        Transform any room with a single click. Choose your space, pick a style,
        and let AI instantly reimagine your room with a fresh new look.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* room-image upload section */}
        <ImageSelectionInput
          imgOfRoomSelectedByUser={(value) =>
            onHandleImageOfRoomSelectedByUser(value, "roomImageInput")
          }
        />

        {/* form input section */}
        <div>

          {/* room type input field */}
          <RoomTypeInputField
            selectedRoomTypeByUser={(value) =>
              onHandleImageOfRoomSelectedByUser(value, "roomTypeInput")
            }
          />

          {/* design type input field */}
          <RoomDesignTypeInput
            selectedInteriorDesignTypeByUser={(value) =>
              onHandleImageOfRoomSelectedByUser(value, "designTypeInput")
            }
          />

          {/* any additional requirement text area (optional field) */}
          <AdditionalRequirementInput
            additionalRequirementsInputByUser={(value) =>
              onHandleImageOfRoomSelectedByUser(
                value,
                "additionalRequirementsInput",
              )
            }
          />

          {/* button to generate design */}
          <Button
            className="w-full mt-5 py-5 hover:cursor-pointer"
            onClick={handleGenerateImageUsingAI}
          >
            {" "}
            <Sparkles /> Generate Design
          </Button>

          {/* important note */}
          <p className="text-sm text-gray-500 mb-10 mt-3">
            NOTE: Generating your room design will use 1 credit.
          </p>

        </div>

      </div>

      <CustomLoader 
        loading={loading} 
        setLoading={setLoading}
      />

      <AiImgOutputAlertDialog
        openAIOutputDialog={isOpenImgOutputDialogBox}
        setOpenAIOutputDialog={setIsOpenImgOutputDialogBox}
        inputImgUrl={outputData?.inputImgUrl}
        generatedAiImgUrl={outputData?.generatedAiImageUrl}
      />

    </div>
  );
};

export default Page;
