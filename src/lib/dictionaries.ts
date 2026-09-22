import type { ProjectCategory } from "@/types";

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    label: string;
    title: { text: string; accent?: boolean }[][];
    description: string;
    ctaProjects: string;
    ctaContact: string;
    openTo: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string, string, string];
    facts: { label: string; value: string }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    levels: { learning: string; practicing: string; comfortable: string };
  };
  certifications: {
    eyebrow: string;
    title: string;
    viewCredential: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    filterAll: string;
    empty: string;
    categoryLabels: Record<ProjectCategory, string>;
  };
  experience: {
    eyebrow: string;
    title: string;
    present: string;
    closing: {
      label: string;
      disciplines: string[];
      body: string;
      goal: string;
    };
  };
  exploring: {
    label: string;
    items: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    errorGeneric: string;
    errorUnavailable: string;
    errorName: string;
    errorEmail: string;
    errorDate: string;
    errorTime: string;
    connectLinkedin: string;
    booking: {
      intro: string;
      typeLabel: string;
      online: string;
      onlineDuration: string;
      inPerson: string;
      inPersonDuration: string;
      dateLabel: string;
      timeLabel: string;
      selectDatePrompt: string;
      confirmNotice: string;
      orDirect: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
  };
  projectPage: {
    allProjects: string;
    visitLive: string;
    viewCode: string;
    nextProject: string;
    technologiesUsed: string;
    sections: {
      overview: string;
      problem: string;
      solution: string;
      architecture: string;
      technologies: string;
      challenges: string;
      result: string;
      links: string;
    };
  };
  theme: {
    light: string;
    dark: string;
  };
}

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    cta: "Let's work together",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    label: "Trésor Ossohou — Digital Builder",
    title: [
      [{ text: "I" }, { text: "build" }, { text: "secure,", accent: true }],
      [{ text: "useful" }, { text: "and" }, { text: "creative", accent: true }],
      [{ text: "digital" }, { text: "experiences." }],
    ],
    description:
      "Master's student in Cybersecurity & Networks (ERIS) at ESATIC — passionate about cybersecurity, networks, development and building digital solutions.",
    ctaProjects: "View my projects",
    ctaContact: "Get in touch",
    openTo: "Open to opportunities",
  },
  about: {
    eyebrow: "About",
    title: "A little about me.",
    paragraphs: [
      "I'm Trésor Ossohou — a Master's student in Cybersecurity & Networks (ERIS) at ESATIC, Abidjan.",
      "My path keeps circling back to one question: how do things actually work, and how do you make them safer, faster, better built. That question has pulled me toward network security, systems administration, and increasingly, software development.",
      "Alongside my studies I build things — personal projects, small products, entrepreneurial ventures — as a way of turning what I learn into something real.",
      "I'm not trying to be one thing. I'd rather stay curious across security, infrastructure, code and creative work, and let each one sharpen the others.",
    ],
    facts: [
      { label: "Based in", value: "Abidjan, Côte d'Ivoire" },
      { label: "Focus", value: "Network Security & Systems" },
      { label: "Also building", value: "Web products & digital tools" },
      { label: "Approach", value: "Learning → Building → Growing" },
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "My stack.",
    description:
      "A profile in progress — some things I use with confidence, others I'm still building depth in.",
    levels: { learning: "Learning", practicing: "Practicing", comfortable: "Comfortable" },
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Credentials.",
    viewCredential: "View credential",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work.",
    description:
      "A mix of security labs, infrastructure builds, shipped products and creative ventures.",
    filterAll: "All",
    empty: "No projects in this category yet.",
    categoryLabels: {
      network: "Network",
      cybersecurity: "Cybersecurity",
      systems: "System Administration",
      soc: "SOC",
      development: "Development",
      community: "Digital / Community",
      creative: "Entrepreneurship / Creative",
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Journey.",
    present: "Present",
    closing: {
      label: "Today — A profile under construction",
      disciplines: [
        "Mathematics",
        "Networks",
        "Cybersecurity",
        "Development",
        "Entrepreneurship",
        "Audiovisual",
      ],
      body: "From Bondoukou to ESATIC, from mathematics to cybersecurity, from learning to a work-study program and now to building projects — each step has added a new skill to my profile.",
      goal: "My goal: keep learning, building, and turning my ideas into real projects.",
    },
  },
  exploring: {
    label: "Currently exploring",
    items: [
      "Cybersecurity",
      "Network Security",
      "Cloud",
      "AI-assisted development",
      "Vibecoding",
      "SaaS development",
      "DevSecOps",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have an idea, opportunity or project?",
    description: "Let's build something meaningful.",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "What would you like to discuss? (optional)",
    send: "Request appointment",
    sending: "Sending request...",
    success: "Request received! I'll confirm your appointment within 24 hours by email.",
    errorGeneric: "Something went wrong. Please try again, or email me directly.",
    errorUnavailable:
      "The booking form isn't fully configured yet. Please reach out directly by email in the meantime.",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorDate: "Please pick a date.",
    errorTime: "Please pick a time.",
    connectLinkedin: "Connect on LinkedIn",
    booking: {
      intro: "Prefer a call? Pick a type, a date and a time — I'll confirm within 24 hours.",
      typeLabel: "Meeting type",
      online: "Online",
      onlineDuration: "30 min max — video call",
      inPerson: "In person",
      inPersonDuration: "1h max — Abidjan",
      dateLabel: "Date",
      timeLabel: "Time",
      selectDatePrompt: "Pick a date to see available times",
      confirmNotice: "This is a request, not an instant booking — I'll confirm your exact slot by email within 24 hours.",
      orDirect: "Prefer not to book? Reach me directly:",
    },
  },
  footer: {
    tagline: "Cybersecurity • Technology • Creativity",
    rights: "All rights reserved.",
  },
  projectPage: {
    allProjects: "All projects",
    visitLive: "Visit live",
    viewCode: "View code",
    nextProject: "Next project",
    technologiesUsed: "Technologies used",
    sections: {
      overview: "Overview",
      problem: "Problem",
      solution: "Solution",
      architecture: "Architecture",
      technologies: "Technologies",
      challenges: "Challenges",
      result: "Result",
      links: "Links",
    },
  },
  theme: {
    light: "Light mode",
    dark: "Dark mode",
  },
};

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    experience: "Parcours",
    contact: "Contact",
    cta: "Travaillons ensemble",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  hero: {
    label: "Trésor Ossohou — Bâtisseur numérique",
    title: [
      [{ text: "Je" }, { text: "construis" }, { text: "des" }],
      [{ text: "expériences" }, { text: "numériques" }],
      [
        { text: "sûres,", accent: true },
        { text: "utiles" },
        { text: "et" },
        { text: "créatives.", accent: true },
      ],
    ],
    description:
      "Étudiant en Master Cybersécurité & Réseaux (ERIS) à l'ESATIC — passionné par la cybersécurité, les réseaux, le développement et la création de solutions digitales.",
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
    openTo: "Ouvert aux opportunités",
  },
  about: {
    eyebrow: "À propos",
    title: "Un peu à propos de moi.",
    paragraphs: [
      "Je suis Trésor Ossohou — étudiant en Master Cybersécurité & Réseaux (ERIS) à l'ESATIC, Abidjan.",
      "Mon parcours revient toujours à la même question : comment les choses fonctionnent vraiment, et comment les rendre plus sûres, plus rapides, mieux construites. Cette question m'a naturellement conduit vers la sécurité réseau, l'administration systèmes, et de plus en plus, le développement logiciel.",
      "En parallèle de mes études, je construis des choses — projets personnels, petits produits, initiatives entrepreneuriales — pour transformer ce que j'apprends en réalisations concrètes.",
      "Je ne cherche pas à me limiter à un seul domaine. Je préfère rester curieux entre sécurité, infrastructure, code et création, et laisser chacun de ces domaines nourrir les autres.",
    ],
    facts: [
      { label: "Basé à", value: "Abidjan, Côte d'Ivoire" },
      { label: "Focus", value: "Sécurité réseau & systèmes" },
      { label: "Je construis aussi", value: "Produits web & outils digitaux" },
      { label: "Approche", value: "Apprendre → Construire → Grandir" },
    ],
  },
  skills: {
    eyebrow: "Compétences",
    title: "Ma stack.",
    description:
      "Un profil en construction — certaines choses que je maîtrise avec confiance, d'autres que j'approfondis encore.",
    levels: { learning: "Apprentissage", practicing: "En pratique", comfortable: "À l'aise" },
  },
  certifications: {
    eyebrow: "Certifications",
    title: "Certifications.",
    viewCredential: "Voir le certificat",
  },
  projects: {
    eyebrow: "Projets",
    title: "Travaux sélectionnés.",
    description:
      "Un mélange de labs sécurité, de projets d'infrastructure, de produits livrés et d'initiatives créatives.",
    filterAll: "Tous",
    empty: "Aucun projet dans cette catégorie pour le moment.",
    categoryLabels: {
      network: "Réseau",
      cybersecurity: "Cybersécurité",
      systems: "Administration système",
      soc: "SOC",
      development: "Développement",
      community: "Digital / Communauté",
      creative: "Entrepreneuriat / Créatif",
    },
  },
  experience: {
    eyebrow: "Parcours",
    title: "Parcours.",
    present: "Aujourd'hui",
    closing: {
      label: "Aujourd'hui — Un profil en construction",
      disciplines: [
        "Mathématiques",
        "Réseaux",
        "Cybersécurité",
        "Développement",
        "Entrepreneuriat",
        "Audiovisuel",
      ],
      body: "De Bondoukou à l'ESATIC, des mathématiques à la cybersécurité, de l'apprentissage à l'alternance et aujourd'hui à la création de projets, chaque étape m'a permis d'ajouter une nouvelle compétence à mon profil.",
      goal: "Mon objectif : continuer à apprendre, construire et transformer mes idées en projets concrets.",
    },
  },
  exploring: {
    label: "En cours d'exploration",
    items: [
      "Cybersécurité",
      "Sécurité réseau",
      "Cloud",
      "Développement assisté par IA",
      "Vibecoding",
      "Développement SaaS",
      "DevSecOps",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Une idée, une opportunité ou un projet ?",
    description: "Construisons quelque chose qui a du sens.",
    name: "Nom",
    email: "Email",
    message: "Message",
    messagePlaceholder: "De quoi aimeriez-vous parler ? (optionnel)",
    send: "Demander un rendez-vous",
    sending: "Envoi de la demande...",
    success: "Demande reçue ! Je confirme votre rendez-vous sous 24h par email.",
    errorGeneric: "Une erreur est survenue. Réessayez, ou écrivez-moi directement par email.",
    errorUnavailable:
      "Le formulaire de rendez-vous n'est pas encore pleinement configuré. En attendant, contactez-moi directement par email.",
    errorName: "Merci d'indiquer votre nom.",
    errorEmail: "Merci d'indiquer une adresse email valide.",
    errorDate: "Merci de choisir une date.",
    errorTime: "Merci de choisir un horaire.",
    connectLinkedin: "Me suivre sur LinkedIn",
    booking: {
      intro: "Vous préférez un appel ? Choisissez un type, une date et une heure — je confirme sous 24h.",
      typeLabel: "Type de rendez-vous",
      online: "En ligne",
      onlineDuration: "30 min maxi — appel vidéo",
      inPerson: "En présentiel",
      inPersonDuration: "1h maxi — Abidjan",
      dateLabel: "Date",
      timeLabel: "Heure",
      selectDatePrompt: "Choisissez une date pour voir les horaires disponibles",
      confirmNotice: "Ceci est une demande, pas une réservation instantanée — je confirme votre créneau exact par email sous 24h maximum.",
      orDirect: "Vous ne voulez pas réserver ? Contactez-moi directement :",
    },
  },
  footer: {
    tagline: "Cybersécurité • Technologie • Créativité",
    rights: "Tous droits réservés.",
  },
  projectPage: {
    allProjects: "Tous les projets",
    visitLive: "Voir le site",
    viewCode: "Voir le code",
    nextProject: "Projet suivant",
    technologiesUsed: "Technologies utilisées",
    sections: {
      overview: "Aperçu",
      problem: "Problème",
      solution: "Solution",
      architecture: "Architecture",
      technologies: "Technologies",
      challenges: "Défis",
      result: "Résultat",
      links: "Liens",
    },
  },
  theme: {
    light: "Mode clair",
    dark: "Mode sombre",
  },
};

export const dictionaries: Record<"en" | "fr", Dictionary> = { en, fr };
