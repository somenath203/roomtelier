"use client";

import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";


const HouseDesignsAIOfUser = () => {

  const { user } = useUser();

  const [ userRoomReDesignList, setUserRoomReDesignList ] = useState([]);

  return (
    <div>

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-3xl tracking-wide">
          Hello, {user?.fullName}
        </h2>

        <Link href='/dashboard/create-new-interior-design'>

          <Button className="p-4 cursor-pointer">
            {" "}
            <Plus /> Redesign your Room{" "}

          </Button>

        </Link>

      </div>

      {userRoomReDesignList?.length === 0 ? (

        <EmptyState />

      ) : (

        <></>
        
      )}

    </div>
  );
};

export default HouseDesignsAIOfUser;
