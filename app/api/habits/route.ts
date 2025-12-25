import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

// Getting all habits
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const habits = await prisma.habit.findMany({
    where: {
      userId,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(habits);
}

// Creating a new habit
export async function POST(requset: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await requset.json();

  const { name, frequency, daysOfWeek, reason, minGoal } = body;

  if (!name || !frequency) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const habit = await prisma.habit.create({
    data: {
      name,
      frequency,
      daysOfWeek,
      reason,
      minGoal,
      userId,
    },
  });

  return Response.json(habit);
}
