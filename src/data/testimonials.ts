import type { Testimonial } from "@/types";
import testimonialsData from "./testimonials.json";

/**
 * Published testimonials. Managed from /admin (Testimonials tab) —
 * approving a pending submission there appends it here via a commit.
 * Nothing is auto-published from the public submission form.
 */
export const testimonials = testimonialsData as unknown as Testimonial[];
