"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 ">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 ">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <Button
        onClick={() => authClient.signOut()}
        className="font-medium rounded-md px-5 py-2 "
      >
        Sign Out
      </Button>
    </main>
  );
}
