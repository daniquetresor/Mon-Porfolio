import type { Testimonial } from "@/types";

/**
 * Published testimonials. New submissions arrive by email (see
 * src/app/api/testimonials/route.ts) for manual review before being
 * added here — nothing is auto-published to avoid spam/unmoderated
 * content going live on its own.
 */
export const testimonials: Testimonial[] = [];
