'use client';

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Armchair, Coins, LayoutDashboard, Plus } from "lucide-react";

import { UserDetailsContext } from "@/app/_context/userDetailsContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const Header = () => {

  const pathname = usePathname();

  // Safe even if this header is rendered where the provider isn't mounted
  const { userDetailsGlobalContext } = useContext(UserDetailsContext) ?? {};

  const totalCredits = userDetailsGlobalContext?.totalCredits;

  const isOnDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">

      <nav aria-label="Main" className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Armchair className="h-5 w-5" aria-hidden="true" />
          </span>

          <span className="hidden text-xl font-bold tracking-tight sm:inline">
            Room<span className="text-primary">Telier</span>
          </span>

          <span className="sr-only sm:hidden">RoomTelier</span>

        </Link>

        <div className="flex items-center gap-2 sm:gap-3">

          {/* dashboard */}
          <Button
            asChild
            variant="ghost"
            className={cn("px-3 sm:px-4", isOnDashboard && "bg-muted")}
          >

            <Link
              href="/dashboard"
              aria-label="Dashboard"
              aria-current={isOnDashboard ? "page" : undefined}
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

          </Button>

          {/* buy credits */}
          <Button asChild className="bg-primary px-3 sm:px-4">

            <Link href="/dashboard/buy-credits" aria-label="Buy credits">

              <Plus className="h-4 w-4" aria-hidden="true" />

              <span className="hidden sm:inline">Buy Credits</span>

            </Link>

          </Button>

          {/* credit balance */}
          <div
            role="status"
            className="flex h-9 items-center gap-1.5 rounded-full border border-primary/20 bg-yellow-50 px-3 text-sm font-semibold text-primary"
          >
            🪙
            {totalCredits === undefined ? (
              <span className="h-4 w-5 animate-pulse rounded bg-primary/20" aria-hidden="true" />
            ) : (
              <span>{totalCredits}</span>
            )}
            <span className="sr-only sm:not-sr-only">
              {totalCredits === 1 ? "credit" : "credits"}
            </span>
            
          </div>

          <UserButton />

        </div>

      </nav>

    </header>
  );
};

export default Header;