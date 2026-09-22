import type { SocialLink } from "@/types";

export const site = {
  name: "Trésor Ossohou",
  fullName: "Ossohou Yavo Danique Trésor",
  role: "Digital Builder",
  tagline: "Cybersecurity × Technology × Creativity",
  school: "ESATIC",
  program: "Master's student — Cybersecurity & Networks (ERIS)",
  location: "Abidjan, Côte d'Ivoire",
  email: "daniquetresor@gmail.com",
  phones: ["+225 07 97 86 99 97", "+225 01 72 77 82 60"],
  url: "https://tresor-ossohou.vercel.app",
  description:
    "Master's student in Cybersecurity & Networks (ERIS) at ESATIC, working across network security, systems, development and creative digital projects.",
} as const;

// Note: no GitHub URL was provided — add it here once available and the
// related UI (nav button, project links) will pick it up automatically.
export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tr%C3%A9sor-ossohou-015a522a2",
    icon: "linkedin",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@tresorossohou0?_r=1&_t=ZN-99wl6kA9iVu",
    icon: "tiktok",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: "mail",
  },
];

export const githubUrl: string | undefined = undefined;
