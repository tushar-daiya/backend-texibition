"use client";

import QRCodeScanner from "@/components/QRCodeScanner/QRCodeScanner";
import SignoutButton from "@/components/Signout";

export default function QRCodeWrapper({ userName }: { userName: string }) {
  return (
    <div className="h-[100dvh]">
      <div className="h-20 flex items-center justify-between px-10 border-b">
        <p className="text-2xl font-bold">
          Welcome <span className="text-primary">{userName}</span>
        </p>
        <SignoutButton />
      </div>
      <QRCodeScanner />
    </div>
  );
}
