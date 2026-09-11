import { Geist_Mono, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import CheckUserInfoInDbProvider from "./CheckUserInfoInDbProvider";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "RoomTelier",
  description: "Roomtelier turns any room photo into a stunning new design with AI. Pick your room type and style, and watch your space transform in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>

        <ClerkProvider>
          
          <CheckUserInfoInDbProvider>
            {children}
          </CheckUserInfoInDbProvider>
          
        </ClerkProvider>

      </body>

    </html>
  );
}
