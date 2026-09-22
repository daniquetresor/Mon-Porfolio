import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: { en: "Cybersecurity", fr: "Cybersécurité" },
    skills: [
      { name: "Network Security", level: "practicing" },
      { name: "Security Fundamentals", level: "practicing" },
      { name: "SOC / SIEM", level: "learning" },
      { name: "Wazuh", level: "learning" },
      { name: "Fortinet", level: "practicing" },
      { name: "Ethical Hacking", level: "learning" },
      { name: "Phishing Awareness", level: "comfortable" },
      { name: "Network Segmentation", level: "practicing" },
    ],
  },
  {
    title: { en: "Networking", fr: "Réseaux" },
    skills: [
      { name: "TCP/IP", level: "comfortable" },
      { name: "VLAN", level: "practicing" },
      { name: "Inter-VLAN Routing", level: "practicing" },
      { name: "Switching", level: "practicing" },
      { name: "Routing", level: "practicing" },
      { name: "Firewalls", level: "practicing" },
      { name: "Network Infrastructure", level: "practicing" },
      { name: "EVE-NG", level: "practicing" },
    ],
  },
  {
    title: { en: "Systems", fr: "Systèmes" },
    skills: [
      { name: "Windows Server", level: "practicing" },
      { name: "Active Directory", level: "practicing" },
      { name: "DNS", level: "practicing" },
      { name: "GPO", level: "learning" },
      { name: "Linux", level: "practicing" },
      { name: "Docker", level: "learning" },
    ],
  },
  {
    title: { en: "Development", fr: "Développement" },
    skills: [
      { name: "HTML", level: "comfortable" },
      { name: "CSS", level: "comfortable" },
      { name: "JavaScript", level: "comfortable" },
      { name: "TypeScript", level: "practicing" },
      { name: "React", level: "practicing" },
      { name: "Next.js", level: "practicing" },
      { name: "Node.js", level: "practicing" },
      { name: "FastAPI", level: "learning" },
      { name: "MySQL", level: "practicing" },
      { name: "Prisma", level: "learning" },
    ],
  },
  {
    title: { en: "Tools & Workflow", fr: "Outils & Workflow" },
    skills: [
      { name: "Git", level: "comfortable" },
      { name: "GitHub", level: "comfortable" },
      { name: "Vercel", level: "practicing" },
      { name: "Cursor", level: "practicing" },
      { name: "Claude Code", level: "practicing" },
    ],
  },
];
