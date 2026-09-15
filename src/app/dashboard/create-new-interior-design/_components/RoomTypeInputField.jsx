import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoomTypeInputField = ({ selectedRoomTypeByUser }) => {
  return (
    <div>

      <Label className="text-slate-500">Select Room Type <span className="text-red-500">*</span> </Label>

      <Select onValueChange={(value) => selectedRoomTypeByUser(value)}>

        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="Living Room">Living Room</SelectItem>
            <SelectItem value="Bedroom">Bed Room</SelectItem>
            <SelectItem value="Kitchen">Kitchen</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
            <SelectItem value="Bathroom">Bathroom</SelectItem>
          </SelectGroup>

        </SelectContent>

      </Select>

    </div>
  );
};

export default RoomTypeInputField;
