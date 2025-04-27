"use client";

import QRCodeScanner from "@/components/QRCodeScanner/QRCodeScanner";
import SignoutButton from "@/components/Signout";

export default function QRCodeWrapper({ userName }: { userName: string }) {
  return (
    <div className="h-[100dvh]">
      <div className="h-20 flex items-center justify-between md:px-10 px-4 border-b">
        <p className="md:text-2xl text-lg font-bold">
          Welcome <span className="text-primary">{userName}</span>
        </p>
        <SignoutButton />
      </div>
      <QRCodeScanner />
    </div>
  );
}
