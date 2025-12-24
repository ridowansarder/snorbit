import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            A quick overview of your recent consistency.
          </p>
        </div>

        <Button asChild>
          <Link href="/habits/new">New Habit</Link>
        </Button>
      </div>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active habits"
          value="—"
          description="Habits you're currently tracking"
        />
        <StatCard
          title="Consistency rate"
          value="—%"
          description="Last 30 days"
        />
        <StatCard
          title="Check-ins this week"
          value="—"
          description="Total completed check-ins"
        />
        <StatCard
          title="Most fragile habit"
          value="—"
          description="Lowest consistency"
        />
      </section>

      {/* Empty state / guidance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Start small</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>Consistency is built through reflection, not pressure.</p>
          <p>
            Create one habit you can realistically complete even on bad days.
          </p>

          <Button asChild className="mt-4">
            <Link href="/habits/new">Create your first habit</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
