import LoginForm from "@/components/Login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center flex-col justify-center h-[100dvh] px-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  );
}
