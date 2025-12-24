import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Button variant="outline" className="absolute top-4 left-4" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </Button>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
}
