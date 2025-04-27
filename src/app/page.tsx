import QRCodeWrapper from "@/components/QRCodeScanner/QRCodeWrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user?.username === "admin") {
    redirect("/admin");
  }

  // return <div></div>;
  return <QRCodeWrapper userName={session.user?.name || "User"} />;
}
