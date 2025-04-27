"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function QRCodeScanner() {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark component as hydrated
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    const qrCodeSuccessCallback = async (
      decodedText: string,
    ) => {
      await html5QrCode.stop();
      toast.loading("Verifying...");
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify({
            data: decodedText,
          }),
        });

        const data = await res.json();
        toast.dismiss();

        if (res.status === 200) toast.success(data.message);
        else toast.error(data.message || "Error");
      } catch (err) {
        toast.dismiss();
        toast.error("Failed to verify QR Code.");
        console.error(err);
      } finally {
        html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 300, height: 300 } },
          qrCodeSuccessCallback,
          qrCodeErrorCallback
        );
      }
    };

    const qrCodeErrorCallback = () => {
      // Ignore or log minimal
      
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 300, height: 300 } },
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      )
      .catch((err) => {
        console.error("Failed to start scanner", err);
      });

    return () => {
      html5QrCode
        .stop()
        .then(() => html5QrCode.clear())
        .catch((err) => console.error("Failed to stop QR scanner", err));
    };
  }, [isHydrated]);

  return (
    <div className="px-4 max-w-2xl mx-auto mt-40">
      <div id="reader" />
    </div>
  );
}
