import { z } from "zod";

export const HabitValidation = z.object({
  name: z.string().min(1).max(100),
  frequency: z.enum(["DAILY", "CUSTOM"]),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  reason: z.string().min(1).max(100).optional(),
  minGoal: z.string().max(50).optional(),
});
