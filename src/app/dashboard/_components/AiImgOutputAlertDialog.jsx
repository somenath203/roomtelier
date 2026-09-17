import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const AiImgOutputAlertDialog = ({ openAIOutputDialog, setOpenAIOutputDialog, inputImgUrl, generatedAiImgUrl }) => {
  return (
    <div>

      <AlertDialog open={openAIOutputDialog} onOpenChange={setOpenAIOutputDialog}>
        
        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>Result</AlertDialogTitle>

            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: inputImgUrl,
              }}
              secondImage={{
                imageUrl: generatedAiImgUrl,
              }}
            />

          </AlertDialogHeader>

          <AlertDialogFooter>

            <Button
              onClick={(event) => {
                /*
                 * Prevents the click event from bubbling up to the parent <div>.
                 * Without this, clicking "Close" would also trigger the parent's
                 * onClick handler and reopen the AlertDialog immediately.
                 */
                event.stopPropagation();
                setOpenAIOutputDialog(false);
              }}
              className="hover:cursor-pointer"
            >
              Close
            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
};


export default AiImgOutputAlertDialog;
