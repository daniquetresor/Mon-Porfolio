export type Locale = "en" | "fr";
export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectCategory =
  | "network"
  | "cybersecurity"
  | "systems"
  | "soc"
  | "development"
  | "community"
  | "creative";

export interface Project {
  slug: string;
  title: string;
  role?: LocalizedText;
  categories: ProjectCategory[];
  year?: string;
  summary: LocalizedText;
  description: LocalizedList;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  cover: {
    tone: "network" | "cyber" | "system" | "soc" | "dev" | "community" | "creative";
  };
  caseStudy?: {
    overview: LocalizedText;
    problem: LocalizedText;
    solution: LocalizedText;
    architecture?: LocalizedText;
    technologies: LocalizedText;
    challenges: LocalizedText;
    result: LocalizedText;
  };
}

export type SkillLevel = "learning" | "practicing" | "comfortable";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: LocalizedText;
  skills: Skill[];
}

export interface Certification {
  name: string;
  organization: string;
  date?: string;
  credentialId?: string;
  link?: string;
}

export type ExperienceIcon = "education" | "work" | "cert" | "code" | "creative";

export interface ExperienceItem {
  period: string;
  title: LocalizedText;
  org?: LocalizedText;
  description: LocalizedList;
  current?: boolean;
  icon: ExperienceIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "tiktok" | "phone";
}
