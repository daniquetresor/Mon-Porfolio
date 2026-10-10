import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please share at least a few words.").max(1000),
  rating: z.number().int().min(1).max(5).optional(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
