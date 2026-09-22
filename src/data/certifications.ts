import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    name: "NSE 1 — Certified in Cybersecurity",
    organization: "Fortinet",
    date: "2026-08-01",
    credentialId: "5398482381YD",
    certificateFile: "/certifications/nse1-certificate.pdf",
    badges: [
      { src: "/certifications/badges/nse1-certified.png", label: "NSE 1 Certified" },
      { src: "/certifications/badges/nse1-exam.png", label: "NSE 1 Exam — Cybersecurity and Cloud Fundamentals" },
    ],
  },
  {
    name: "NSE 2 — Certified in Cybersecurity",
    organization: "Fortinet",
    date: "2026-08-01",
    credentialId: "1386699089YD",
    certificateFile: "/certifications/nse2-certificate.pdf",
    badges: [
      { src: "/certifications/badges/nse2-certified.png", label: "NSE 2 Certified" },
      { src: "/certifications/badges/nse2-exam.png", label: "NSE 2 Exam — Introduction to the NextGen Firewall" },
    ],
  },
  {
    name: "NSE 3 — Certified in Cybersecurity",
    organization: "Fortinet",
    date: "2026-08-04",
    credentialId: "1342961491YD",
    certificateFile: "/certifications/nse3-certificate.pdf",
    badges: [
      { src: "/certifications/badges/nse3-certified.png", label: "NSE 3 Certified" },
      { src: "/certifications/badges/nse3-exam.png", label: "NSE 3 Exam — FortiGate Operator" },
    ],
  },
  {
    name: "Introduction to Cybersecurity",
    organization: "Cisco Networking Academy",
    date: "2026-08-04",
    credentialId: "d7f5aa4b-8f5c-4e6c-96fc-90975f895cee",
    certificateFile: "/certifications/cisco-intro-cybersecurity-certificate.pdf",
    badges: [
      { src: "/certifications/badges/cisco-intro-cybersecurity.png", label: "Introduction to Cybersecurity" },
    ],
  },
  {
    name: "Ethical Hacker",
    organization: "Cisco Networking Academy",
    date: "2026-08-04",
    credentialId: "a2c6a925-cef0-4e3b-95ba-e70ec40f4a6a",
    certificateFile: "/certifications/cisco-ethical-hacker-certificate.pdf",
    badges: [
      { src: "/certifications/badges/cisco-ethical-hacker.png", label: "Ethical Hacker" },
    ],
  },
];
