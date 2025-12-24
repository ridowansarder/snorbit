"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await authClient.signOut();
    router.replace("/");
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      className="w-full md:w-auto"
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
