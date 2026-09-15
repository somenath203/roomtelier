import { useState } from "react";

import { Label } from "@/components/ui/label";


const RoomDesignTypeInput = ({ selectedInteriorDesignTypeByUser }) => {

  const [ selectedOptionByUser, setSelectedOptionByUser ] = useState();

  const designs = [
    {
      id: 1,
      name: "Modern",
    },
    {
      id: 2,
      name: "Industrial",
    },
    {
      id: 3,
      name: "Bohemian",
    },
    {
      id: 4,
      name: "Traditional",
    },
    {
      id: 5,
      name: "Rustic",
    },
    {
      id: 6,
      name: 'Minimilist'
    }
  ];

  return (
    <div className="mt-5">
      <Label className="text-slate-500">Select Interior Design Type <span className="text-red-500">*</span> </Label>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {designs.map((design) => (
          <div
            key={design.id}
            className={`${design.name === selectedOptionByUser ? 'border-2 border-primary' : 'border'} bg-gray-100 hover:bg-gray-200 p-5 rounded-xl hover:cursor-pointer`}
            onClick={() => {setSelectedOptionByUser(design.name); selectedInteriorDesignTypeByUser(design.name);}}
          >

            <h2 className="text-center">{design.name}</h2>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RoomDesignTypeInput;
