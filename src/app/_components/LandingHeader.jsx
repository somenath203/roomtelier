"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { DESIGN_ROUTE, NAV_LINKS } from "../../landingpagedata";

// If your project already has a Header component, you can reuse it in
// app/page.jsx instead of this one. This version is here so the landing
// page works on its own.
export default function LandingHeader() {
  const { isLoaded, isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setOpen(false);
  const showSignIn = isLoaded && !isSignedIn;
  const showUser = isLoaded && isSignedIn;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Main">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {showSignIn && (
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:cursor-pointer">Sign In</Button>
              </SignInButton>
            )}
            {showUser && <UserButton />}
            <Button asChild className="bg-primary">
              <Link href={DESIGN_ROUTE}>Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="border-t bg-background md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t pt-4">
            {showSignIn && (
              <SignInButton mode="modal">
                <Button variant="outline" className="w-full" onClick={closeMenu}>
                  Sign In
                </Button>
              </SignInButton>
            )}
            {showUser && (
              <div className="flex items-center gap-3 px-3">
                <UserButton />
                <span className="text-sm text-muted-foreground">Your account</span>
              </div>
            )}
            <Button asChild className="w-full bg-primary">
              <Link href={DESIGN_ROUTE} onClick={closeMenu}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}