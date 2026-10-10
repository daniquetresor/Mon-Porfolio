import { z } from "zod";

const localizedText = z.object({
  en: z.string().trim().min(1, "Champ requis (EN)."),
  fr: z.string().trim().min(1, "Champ requis (FR)."),
});

const localizedList = z.object({
  en: z.array(z.string().trim().min(1)).min(1, "Au moins un paragraphe (EN)."),
  fr: z.array(z.string().trim().min(1)).min(1, "Au moins un paragraphe (FR)."),
});

const categoryEnum = z.enum([
  "network",
  "cybersecurity",
  "systems",
  "soc",
  "development",
  "community",
  "creative",
]);

const toneEnum = z.enum(["network", "cyber", "system", "soc", "dev", "community", "creative"]);

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((v) => !v || /^https?:\/\//.test(v), "URL invalide (doit commencer par http(s)://).");

const caseStudySchema = z
  .object({
    overview: localizedText,
    problem: localizedText,
    solution: localizedText,
    architecture: localizedText.optional(),
    technologies: localizedText,
    challenges: localizedText,
    result: localizedText,
  })
  .optional();

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug requis.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Lettres minuscules, chiffres et tirets uniquement."),
  title: z.string().trim().min(1, "Titre requis."),
  role: localizedText.optional(),
  categories: z.array(categoryEnum).min(1, "Choisis au moins une catégorie."),
  year: z.string().trim().optional().or(z.literal("")),
  summary: localizedText,
  description: localizedList,
  technologies: z.array(z.string().trim().min(1)).min(1, "Ajoute au moins une technologie."),
  github: optionalUrl,
  live: optionalUrl,
  featured: z.boolean().optional(),
  cover: z.object({
    tone: toneEnum,
    image: z.string().trim().optional().or(z.literal("")),
    imageFit: z.enum(["cover", "contain"]).optional(),
    frame: z.enum(["browser", "none"]).optional(),
  }),
  caseStudy: caseStudySchema,
});

export type ProjectInput = z.infer<typeof projectSchema>;
