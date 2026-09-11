"use client";

import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";


const Listing = () => {

  const { user } = useUser();

  const [ userRoomReDesignList, setUserRoomReDesignList ] = useState([]);

  return (
    <div>

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-3xl tracking-wide">
          Hello, {user?.fullName}
        </h2>

        <Button className="p-4">
          {" "}
          <Plus /> Redesign your Room{" "}

        </Button>

      </div>

      {userRoomReDesignList?.length === 0 ? (

        <EmptyState />

      ) : (

        <></>
        
      )}

    </div>
  );
};

export default Listing;
