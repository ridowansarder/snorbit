import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Hero = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Build Consistency,
          <br />
          Not Streaks
        </h1>
        <p className="text-xl md:text-2xl px-3 text-foreground/80">
          Snorbit helps you build habits without guilt, streak pressure, or perfection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0 justify-center pt-4">
          <Button size="lg" variant={"outline"} asChild>
            <Link href="/sign-up">Start Building Consistency</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/sign-in">Log In</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pt-8 text-left">
          <Card className="space-y-2 text-lg">
            <CardHeader>
              <CardTitle>No Streak Punishment</CardTitle>
              <CardDescription>
                Missed days don&apos;t reset your progress. Track consistency
                rates, not perfect streaks.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="space-y-2 text-lg">
            <CardHeader>
              <CardTitle>Flexible Goals</CardTitle>
              <CardDescription>
                Set minimum viable goals. &quot;2 minutes counts&quot; means you
                can always say yes.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="space-y-2 text-lg">
            <CardHeader>
              <CardTitle>AI Reflection</CardTitle>
              <CardDescription>
                Get insights on your patterns. Understand what works for you,
                not generic advice.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Hero;
