import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const CustomLoader = ({ loading, setLoading }) => {
  return (
    <AlertDialog open={loading} onOpenChange={setLoading}>

      <AlertDialogContent>

        <div className="my-10 bg-white flex flex-col items-center justify-center gap-1">

            <Loader2 size={40} className="animate-spin duration-150" /> <span className="text-center">Redesigning your room with AI... Please don&apos;t refresh or close this page.</span>

        </div>

      </AlertDialogContent>

    </AlertDialog>
  );
};

export default CustomLoader;
