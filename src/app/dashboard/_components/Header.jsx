'use client';

import { UserButton } from "@clerk/nextjs";
import { useContext } from "react";

import { UserDetailsContext } from "@/app/_context/userDetailsContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Header = () => {

  const { userDetailsGlobalContext } = useContext(UserDetailsContext);

  return (
    <nav className="p-5 shadow-sm flex justify-between items-center">

      <div>

        {/* logo */}
        <h1 className="text-xl font-bold tracking-wide">Room<span className="underline text-primary">Telier</span></h1>

      </div>

      <div className="flex items-center justify-center gap-4">

        <Link href='/dashboard/buy-credits'>

          <Button className="hover:cursor-pointer">Buy Credits</Button>

        </Link>

        <div className="p-1 flex items-center gap-2 bg-yellow-50 px-3 rounded-full border-2">

            <h2>🪙 {userDetailsGlobalContext?.totalCredits} credits</h2>

        </div>

        <UserButton />

      </div>

    </nav>
  );
};

export default Header;
