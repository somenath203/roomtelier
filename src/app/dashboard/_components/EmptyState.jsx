import { Warehouse, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";


const EmptyState = () => {
  return (
    <div className="flex items-center justify-center flex-col">

      <Warehouse size={80} className="mt-30" />

      <h2 className="font-medium text-lg text-gray-500">
        Create new AI Interior design for your room
      </h2>

      <Button className="p-4 mt-5">
        {" "}
        <Plus /> Redesign your Room{" "}
      </Button>

    </div>
  );
};

export default EmptyState;
