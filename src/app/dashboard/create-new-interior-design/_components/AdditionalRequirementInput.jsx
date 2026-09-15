import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdditionalRequirementInput = ({ additionalRequirementsInputByUser }) => {
  return (
    <div className="mt-5">

      <Label className="text-gray-500">Additional Requirements (optional)</Label>

      <Textarea
        className="resize-none mt-3 border-2"
        onChange={(e) => additionalRequirementsInputByUser(e.target.value)}
      />

    </div>
  );
};

export default AdditionalRequirementInput;
