"use client";

import { useUser } from "@clerk/nextjs";
import { Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import RoomDesignOutput from "./RoomDesignOutput";


const HouseDesignsAIOfUser = () => {

  const { user } = useUser();

  const [userRoomReDesignList, setUserRoomReDesignList] = useState([]);

  const [ loadingDesigns, setLoadingDesigns ] = useState(false);


  useEffect(() => {

    if (!user) return;

    const getCurrentAuthenticatedUserAllRoomDesigns = async () => {

      try {

        setLoadingDesigns(true);

        const res = await axios.get("/api/redesign-room-ai");
        
        setUserRoomReDesignList(res?.data?.data ?? []);

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingDesigns(false);

      }

    };

    getCurrentAuthenticatedUserAllRoomDesigns();

  }, [user]);

  return (
    <div>

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-3xl tracking-wide">
          Hello, {user?.fullName}
        </h2>

        <Link href="/dashboard/create-new-interior-design">

          <Button className="p-4 cursor-pointer">
            {" "}
            <Plus /> Redesign your Room{" "}
          </Button>

        </Link>

      </div>

      {loadingDesigns ? (
        <div className="mt-38 flex items-center justify-center">

          <Loader2 size={35} className="animate-spin duration-150" />

        </div>
      ) : userRoomReDesignList?.length === 0 ? <EmptyState /> : (
        <div className="mt-10">

          <h2 className="font-medium text-primary text-xl mb-10">Your AI-generated room designs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {userRoomReDesignList?.map((roomDesign) => (

              <div key={roomDesign?.id}>

                <RoomDesignOutput roomDesignData={roomDesign} />

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default HouseDesignsAIOfUser;
