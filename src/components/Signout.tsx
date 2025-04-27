"use client";
import { authClient } from "@/lib/authclient";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function SignoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignout() {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (error) => {
          toast.error("Failed to sign out");
          console.error("Sign out error:", error);
          setIsLoading(false);
        },
      },
    });
  }

  return (
    <>
      <Button onClick={handleSignout} disabled={isLoading}>
        {isLoading ? "Signing out..." : "Signout"}
      </Button>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-xl animate-pulse">Signing you out...</div>
        </div>
      )}
    </>
  );
}
