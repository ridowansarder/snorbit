import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { HabitValidation } from "@/lib/validations/habit";
import { headers } from "next/headers";
import { z } from "zod";

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
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await request.json();

  const parsedBody = HabitValidation.safeParse(body);

  if (!parsedBody.success) {
    return Response.json(
      { error: "Validation failed", details: z.flattenError(parsedBody.error) },
      { status: 400 }
    );
  }

  const { name, frequency, daysOfWeek = [], reason, minGoal } = parsedBody.data;

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

  return Response.json(habit, { status: 201 });
}
