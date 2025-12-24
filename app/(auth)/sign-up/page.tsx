"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      setLoading(false);
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 ">
            <Label htmlFor="name">Enter Your Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Ridwan Sarder"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="email">Enter Your Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="ridwanzuraiz@gmail.com"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="password">Enter Your Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              minLength={8}
              disabled={loading}
              placeholder="********"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
          <p className="text-center text-sm text-primary">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary underline">
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
