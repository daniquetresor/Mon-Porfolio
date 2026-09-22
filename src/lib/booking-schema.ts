import { z } from "zod";

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z.string().trim().email("Please enter a valid email address."),
    type: z.enum(["online", "in-person"]),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date."),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please pick a time."),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const dt = new Date(`${data.date}T${data.time}:00`);
      return !Number.isNaN(dt.getTime()) && dt.getTime() > Date.now() - 60_000;
    },
    { message: "Please pick a date and time in the future.", path: ["date"] }
  );

export type BookingInput = z.infer<typeof bookingSchema>;

export const MEETING_TYPES = ["online", "in-person"] as const;
export type MeetingType = (typeof MEETING_TYPES)[number];
