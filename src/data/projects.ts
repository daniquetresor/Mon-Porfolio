import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "aje-multisite-network",
    title: "AJE Multisite Network Infrastructure",
    categories: ["network", "cybersecurity"],
    year: "2025",
    summary: {
      en: "Design, deployment and security hardening of a multisite network infrastructure, interconnecting several sites over a segmented, firewalled topology.",
      fr: "Conception, déploiement et sécurisation d'une infrastructure réseau multisite, interconnectant plusieurs sites sur une topologie segmentée et protégée par pare-feu.",
    },
    description: {
      en: [
        "A lab-based project focused on designing and deploying a multisite network infrastructure — interconnecting several sites while keeping traffic segmented and controlled.",
        "The work covered VLAN design, inter-VLAN routing, switching and routing configuration, and perimeter security with FortiGate, all built and tested in EVE-NG.",
      ],
      fr: [
        "Un projet de laboratoire centré sur la conception et le déploiement d'une infrastructure réseau multisite — interconnecter plusieurs sites tout en gardant le trafic segmenté et contrôlé.",
        "Le travail a couvert la conception des VLAN, le routage inter-VLAN, la configuration du switching et du routage, ainsi que la sécurité périmétrique avec FortiGate, le tout construit et testé sous EVE-NG.",
      ],
    },
    technologies: [
      "VLAN",
      "Inter-VLAN Routing",
      "FortiGate",
      "Switching",
      "Routing",
      "EVE-NG",
      "Network Segmentation",
    ],
    featured: true,
    cover: {
      tone: "network",
      image: "/images/projects/aje-multisite-network.png",
      imageFit: "contain",
      frame: "none",
    },
    caseStudy: {
      overview: {
        en: "A simulated multisite network built to practice enterprise-grade design: several interconnected sites, each segmented internally and secured at the perimeter.",
        fr: "Un réseau multisite simulé, construit pour pratiquer une conception de niveau entreprise : plusieurs sites interconnectés, chacun segmenté en interne et sécurisé au périmètre.",
      },
      problem: {
        en: "A flat, unsegmented network makes lateral movement easy and gives every device the same level of trust — the opposite of what a real multisite organization needs.",
        fr: "Un réseau plat et non segmenté facilite les mouvements latéraux et accorde le même niveau de confiance à tous les équipements — l'inverse de ce dont une véritable organisation multisite a besoin.",
      },
      solution: {
        en: "The network was split into VLANs by function, with inter-VLAN routing controlling what could talk to what, and FortiGate firewalls enforcing policy at each site boundary.",
        fr: "Le réseau a été découpé en VLAN par fonction, avec un routage inter-VLAN contrôlant les échanges autorisés, et des pare-feux FortiGate appliquant la politique de sécurité à chaque frontière de site.",
      },
      architecture: {
        en: "Each site runs its own VLAN structure with dedicated switching and routing, interconnected through secured links and centralized firewall policy — all modeled and validated in EVE-NG before documentation.",
        fr: "Chaque site dispose de sa propre structure VLAN avec switching et routage dédiés, interconnectés via des liens sécurisés et une politique de pare-feu centralisée — le tout modélisé et validé sous EVE-NG avant documentation.",
      },
      technologies: {
        en: "VLAN, inter-VLAN routing, switching, routing, FortiGate firewall policy, and EVE-NG for topology simulation.",
        fr: "VLAN, routage inter-VLAN, switching, routage, politique de pare-feu FortiGate, et EVE-NG pour la simulation de topologie.",
      },
      challenges: {
        en: "Getting inter-VLAN routing and firewall rules to agree with each other without accidentally blocking legitimate traffic took several iterations of testing and adjustment.",
        fr: "Faire coïncider le routage inter-VLAN et les règles de pare-feu sans bloquer accidentellement du trafic légitime a demandé plusieurs itérations de tests et d'ajustements.",
      },
      result: {
        en: "A working, documented multisite topology with segmented traffic and enforced firewall policy — a reference lab for how a segmented enterprise network is actually built.",
        fr: "Une topologie multisite fonctionnelle et documentée, avec trafic segmenté et politique de pare-feu appliquée — un lab de référence sur la construction concrète d'un réseau d'entreprise segmenté.",
      },
    },
  },
  {
    slug: "hexatech-iam",
    title: "HexaTech IAM",
    categories: ["cybersecurity", "systems"],
    year: "2025",
    summary: {
      en: "User account administration and hardening of a Windows Server environment — identity, access and endpoint security brought together.",
      fr: "Administration des comptes utilisateurs et sécurisation d'un environnement Windows Server — identité, accès et sécurité des postes réunis.",
    },
    description: {
      en: [
        "A systems administration project centered on identity and access management inside a Windows Server environment.",
        "It combined Active Directory account and group management with DNS and GPO configuration, and layered on FortiGate and UserLock with MFA to strengthen access control.",
      ],
      fr: [
        "Un projet d'administration systèmes centré sur la gestion des identités et des accès au sein d'un environnement Windows Server.",
        "Il a combiné la gestion des comptes et groupes Active Directory avec la configuration DNS et GPO, en ajoutant FortiGate et UserLock avec MFA pour renforcer le contrôle d'accès.",
      ],
    },
    technologies: [
      "Windows Server",
      "Active Directory",
      "DNS",
      "GPO",
      "FortiGate",
      "UserLock",
      "MFA",
    ],
    featured: true,
    cover: { tone: "system" },
    caseStudy: {
      overview: {
        en: "An identity and access management setup built around Windows Server — from account provisioning to enforced multi-factor authentication.",
        fr: "Une configuration de gestion des identités et des accès construite autour de Windows Server — du provisionnement des comptes à l'authentification multifacteur appliquée.",
      },
      problem: {
        en: "Weak identity controls are one of the most common ways real environments get compromised — shared credentials, no MFA, and loose group policy.",
        fr: "Des contrôles d'identité faibles sont l'une des causes les plus fréquentes de compromission réelle — identifiants partagés, absence de MFA, politique de groupe relâchée.",
      },
      solution: {
        en: "Active Directory was structured around clear organizational units and group policy, DNS was configured to support the domain reliably, and UserLock was added on top for session control and MFA enforcement.",
        fr: "Active Directory a été structuré autour d'unités d'organisation claires et de stratégies de groupe, le DNS a été configuré pour soutenir le domaine de façon fiable, et UserLock a été ajouté pour le contrôle de session et l'application du MFA.",
      },
      technologies: {
        en: "Windows Server, Active Directory, DNS, Group Policy Objects, FortiGate, UserLock, MFA.",
        fr: "Windows Server, Active Directory, DNS, stratégies de groupe (GPO), FortiGate, UserLock, MFA.",
      },
      challenges: {
        en: "Balancing usability with security — tight GPOs and MFA enforcement had to be configured without locking out legitimate workflows.",
        fr: "Équilibrer sécurité et utilisabilité — les GPO strictes et l'application du MFA devaient être configurées sans bloquer les usages légitimes.",
      },
      result: {
        en: "A Windows Server environment with structured identity management, enforced group policy, and MFA-backed access control.",
        fr: "Un environnement Windows Server avec une gestion des identités structurée, des stratégies de groupe appliquées, et un contrôle d'accès renforcé par MFA.",
      },
    },
  },
  {
    slug: "wazuh-soc",
    title: "Wazuh SOC",
    categories: ["cybersecurity", "soc"],
    year: "2025",
    summary: {
      en: "A SOC monitoring setup built around Wazuh — centralizing logs, detecting anomalies and practicing real threat analysis workflows.",
      fr: "Une supervision SOC construite autour de Wazuh — centralisation des logs, détection d'anomalies et pratique de véritables workflows d'analyse de menaces.",
    },
    description: {
      en: [
        "A project built around Wazuh as a SIEM platform, focused on log centralization, monitoring and threat detection.",
        "The goal was to practice the day-to-day of a SOC analyst: watching for anomalies, triaging alerts and understanding what logs actually reveal about a system's health and security.",
      ],
      fr: [
        "Un projet construit autour de Wazuh comme plateforme SIEM, centré sur la centralisation des logs, la supervision et la détection de menaces.",
        "L'objectif était de pratiquer le quotidien d'un analyste SOC : surveiller les anomalies, trier les alertes et comprendre ce que les logs révèlent réellement sur l'état et la sécurité d'un système.",
      ],
    },
    technologies: ["Wazuh", "SIEM", "Log Monitoring", "Threat Detection", "Security Analysis"],
    cover: {
      tone: "soc",
      image: "/images/projects/wazuh-soc.png",
      imageFit: "cover",
      frame: "browser",
    },
    caseStudy: {
      overview: {
        en: "A Wazuh-based monitoring lab used to understand how a SOC actually watches and reacts to what's happening across an environment.",
        fr: "Un lab de supervision basé sur Wazuh, utilisé pour comprendre comment un SOC surveille et réagit concrètement à ce qui se passe dans un environnement.",
      },
      problem: {
        en: "Without centralized logging and monitoring, security incidents are discovered too late, if at all.",
        fr: "Sans centralisation des logs et supervision, les incidents de sécurité sont découverts trop tard, voire jamais.",
      },
      solution: {
        en: "Wazuh was deployed to collect and correlate logs from monitored endpoints, with alerting rules tuned to surface meaningful anomalies instead of noise.",
        fr: "Wazuh a été déployé pour collecter et corréler les logs des postes surveillés, avec des règles d'alerte ajustées pour faire ressortir des anomalies pertinentes plutôt que du bruit.",
      },
      technologies: {
        en: "Wazuh (SIEM), log collection and correlation, alerting and detection rules.",
        fr: "Wazuh (SIEM), collecte et corrélation de logs, règles d'alerte et de détection.",
      },
      challenges: {
        en: "Tuning alert thresholds to catch real anomalies without drowning in false positives — a core SOC skill in itself.",
        fr: "Ajuster les seuils d'alerte pour détecter de vraies anomalies sans être noyé sous les faux positifs — une compétence SOC à part entière.",
      },
      result: {
        en: "A functioning monitoring setup that gave hands-on experience with the detection and triage workflow a SOC analyst uses daily.",
        fr: "Une supervision fonctionnelle qui a permis une expérience pratique du workflow de détection et de triage utilisé quotidiennement par un analyste SOC.",
      },
    },
  },
  {
    slug: "cybernight",
    title: "CyberNight",
    categories: ["cybersecurity", "development"],
    year: "2025",
    summary: {
      en: "A cybersecurity-oriented SaaS built end-to-end — the clearest example of where my security and development skills meet.",
      fr: "Un SaaS orienté cybersécurité construit de bout en bout — l'exemple le plus clair de la rencontre entre mes compétences en sécurité et en développement.",
    },
    description: {
      en: [
        "CyberNight is a personal SaaS project exploring how cybersecurity concepts translate into an actual product, from API to infrastructure.",
        "The backend runs on FastAPI with MySQL and Redis, the frontend on React, and the whole stack is containerized with Docker and orchestrated with Kubernetes.",
      ],
      fr: [
        "CyberNight est un projet SaaS personnel qui explore comment des concepts de cybersécurité se traduisent dans un vrai produit, de l'API à l'infrastructure.",
        "Le backend tourne sur FastAPI avec MySQL et Redis, le frontend sur React, et toute la stack est conteneurisée avec Docker et orchestrée avec Kubernetes.",
      ],
    },
    technologies: ["FastAPI", "MySQL", "Redis", "React", "Docker", "Kubernetes"],
    featured: true,
    cover: {
      tone: "dev",
      image: "/images/projects/cybernight.png",
      imageFit: "cover",
      frame: "browser",
    },
    caseStudy: {
      overview: {
        en: "A SaaS project built to explore the intersection of cybersecurity, software development and infrastructure — designing, not just consuming, a secure product.",
        fr: "Un projet SaaS construit pour explorer l'intersection entre cybersécurité, développement logiciel et infrastructure — concevoir, et non simplement utiliser, un produit sécurisé.",
      },
      problem: {
        en: "Most of my cybersecurity learning happened by analyzing existing systems. Building one from scratch surfaces a different set of problems: how security decisions get baked into architecture from day one.",
        fr: "La majeure partie de mon apprentissage en cybersécurité s'est faite en analysant des systèmes existants. En construire un depuis zéro fait apparaître d'autres problématiques : comment les décisions de sécurité s'intègrent à l'architecture dès le départ.",
      },
      solution: {
        en: "A FastAPI backend handles the application logic, MySQL and Redis manage persistent and cached data, React powers the interface, and the whole stack is containerized for reproducible deployment.",
        fr: "Un backend FastAPI gère la logique applicative, MySQL et Redis gèrent les données persistantes et le cache, React alimente l'interface, et toute la stack est conteneurisée pour un déploiement reproductible.",
      },
      architecture: {
        en: "A service-oriented backend (FastAPI) talks to MySQL for persistence and Redis for caching/session data, with the React frontend consuming the API. Docker packages each service, and Kubernetes handles orchestration.",
        fr: "Un backend orienté services (FastAPI) communique avec MySQL pour la persistance et Redis pour le cache/les sessions, le frontend React consommant l'API. Docker empaquette chaque service, et Kubernetes gère l'orchestration.",
      },
      technologies: {
        en: "FastAPI, MySQL, Redis, React, Docker, Kubernetes.",
        fr: "FastAPI, MySQL, Redis, React, Docker, Kubernetes.",
      },
      challenges: {
        en: "Learning Kubernetes orchestration alongside application development at the same time — infrastructure and product decisions kept influencing each other.",
        fr: "Apprendre l'orchestration Kubernetes en même temps que le développement applicatif — les décisions d'infrastructure et de produit s'influençaient continuellement.",
      },
      result: {
        en: "A working full-stack SaaS project that ties together backend development, data layers, containerization and orchestration — an ongoing project I keep iterating on.",
        fr: "Un projet SaaS full-stack fonctionnel qui relie développement backend, couches de données, conteneurisation et orchestration — un projet vivant que je continue de faire évoluer.",
      },
    },
  },
  {
    slug: "containers-kubernetes-lab",
    title: "Containers & Kubernetes Lab",
    categories: ["systems", "development"],
    summary: {
      en: "A hands-on lab exploring containerization and Kubernetes orchestration — from single containers to a working multi-service cluster.",
      fr: "Un lab pratique explorant la conteneurisation et l'orchestration Kubernetes — des conteneurs isolés jusqu'à un cluster multi-services fonctionnel.",
    },
    description: {
      en: [
        "A practical lab built to understand containers and Kubernetes beyond the theory — packaging services, deploying them, and managing them as a cluster.",
        "Covers Docker fundamentals, image building, and Kubernetes concepts like pods, deployments and services.",
      ],
      fr: [
        "Un lab pratique construit pour comprendre les conteneurs et Kubernetes au-delà de la théorie — empaqueter des services, les déployer et les gérer en cluster.",
        "Couvre les fondamentaux de Docker, la construction d'images, et les concepts Kubernetes comme les pods, deployments et services.",
      ],
    },
    technologies: ["Docker", "Kubernetes", "Containers", "Linux"],
    github: "https://github.com/daniquetresor/CONTENEURS_-_KUBERNETES.git",
    cover: {
      tone: "system",
      image: "/images/projects/containers-kubernetes-lab.jpg",
      imageFit: "contain",
      frame: "none",
    },
    caseStudy: {
      overview: {
        en: "A lab dedicated to containerization and orchestration, moving from standalone Docker containers to a Kubernetes-managed cluster.",
        fr: "Un lab dédié à la conteneurisation et à l'orchestration, passant de conteneurs Docker isolés à un cluster géré par Kubernetes.",
      },
      problem: {
        en: "Applications packaged and run manually don't scale, and understanding modern infrastructure requires hands-on practice with containers, not just reading about them.",
        fr: "Des applications empaquetées et lancées manuellement ne passent pas à l'échelle, et comprendre l'infrastructure moderne demande de la pratique concrète avec les conteneurs, pas seulement de la lecture.",
      },
      solution: {
        en: "Built and containerized services with Docker, then deployed and managed them on Kubernetes — working through pods, deployments, services and scaling.",
        fr: "Construction et conteneurisation de services avec Docker, puis déploiement et gestion sur Kubernetes — en travaillant les pods, deployments, services et le scaling.",
      },
      technologies: {
        en: "Docker, Kubernetes, container images, Linux.",
        fr: "Docker, Kubernetes, images de conteneurs, Linux.",
      },
      challenges: {
        en: "Getting comfortable with Kubernetes' declarative model after Docker's more direct, imperative workflow took deliberate practice.",
        fr: "S'habituer au modèle déclaratif de Kubernetes après le fonctionnement plus direct et impératif de Docker a demandé une pratique délibérée.",
      },
      result: {
        en: "A working Kubernetes lab environment and a clearer, hands-on understanding of how containerized applications are actually deployed and managed at scale.",
        fr: "Un environnement de lab Kubernetes fonctionnel et une compréhension pratique plus claire de la manière dont les applications conteneurisées sont réellement déployées et gérées à grande échelle.",
      },
    },
  },
  {
    slug: "mr-ladjoukrou-studio",
    title: "Mr L'Adjoukrou Studio",
    role: { en: "Deputy CEO / Co-founder", fr: "PDG adjoint / Co-fondateur" },
    categories: ["creative"],
    year: "2026",
    summary: {
      en: "A creative studio I co-founded, specialized in photography and audiovisual production for weddings, traditional ceremonies, and brand content.",
      fr: "Un studio créatif que j'ai co-fondé, spécialisé dans la photographie et la production audiovisuelle pour mariages, cérémonies traditionnelles et contenu de marque.",
    },
    description: {
      en: [
        "Mr L'Adjoukrou Studio is an entrepreneurial venture I co-founded, as Deputy CEO, focused on photography and audiovisual production.",
        "The studio covers weddings, dowry ceremonies (dot), baptisms, reportage, brand content and advertising — a different dimension of my profile where creativity, entrepreneurship and technology meet.",
      ],
      fr: [
        "Mr L'Adjoukrou Studio est une initiative entrepreneuriale que j'ai co-fondée, en tant que PDG adjoint, centrée sur la photographie et la production audiovisuelle.",
        "Le studio couvre les mariages, la dot, les baptêmes, le reportage, le contenu de marque et la publicité — une autre dimension de mon profil, où créativité, entrepreneuriat et technologie se rencontrent.",
      ],
    },
    technologies: ["Photography", "Videography", "Brand Content", "Web Presence"],
    github: undefined,
    live: "https://mr-l-adjoukrou.vercel.app/",
    featured: true,
    cover: {
      tone: "creative",
      image: "/images/projects/mr-ladjoukrou-studio.png",
      imageFit: "contain",
      frame: "none",
    },
    caseStudy: {
      overview: {
        en: "An entrepreneurial venture co-founded to build a professional photography and audiovisual studio, with its own digital presence.",
        fr: "Une initiative entrepreneuriale co-fondée pour bâtir un studio professionnel de photographie et de production audiovisuelle, avec sa propre présence digitale.",
      },
      problem: {
        en: "Turning a creative skill set — photography and video — into a structured, professional studio with a real market presence.",
        fr: "Transformer des compétences créatives — photo et vidéo — en un studio structuré et professionnel, avec une vraie présence sur le marché.",
      },
      solution: {
        en: "Co-founded and helped structure the studio as Deputy CEO, covering everything from service offerings (weddings, dot, baptisms, reportage, brand content) to building its web presence.",
        fr: "Co-fondation et structuration du studio en tant que PDG adjoint, couvrant tout, de l'offre de services (mariages, dot, baptêmes, reportage, contenu de marque) à la construction de sa présence web.",
      },
      technologies: {
        en: "Photography, videography, brand content production, and a Next.js-based web presence.",
        fr: "Photographie, vidéographie, production de contenu de marque, et une présence web construite avec Next.js.",
      },
      challenges: {
        en: "Running a creative business alongside a technical degree — balancing client work, production quality and the operational side of a studio.",
        fr: "Faire tourner une entreprise créative en parallèle d'un cursus technique — équilibrer travail client, qualité de production et volet opérationnel d'un studio.",
      },
      result: {
        en: "A functioning creative studio with an active portfolio and online presence, and a concrete example of entrepreneurship outside of pure tech.",
        fr: "Un studio créatif opérationnel avec un portfolio actif et une présence en ligne, et un exemple concret d'entrepreneuriat en dehors de la pure technique.",
      },
    },
  },
  {
    slug: "fortigate-network-security-lab",
    title: "FortiGate Network Security Lab",
    categories: ["network", "cybersecurity"],
    summary: {
      en: "A hands-on lab securing a network with FortiGate — firewall policy, traffic control and network protection put into practice.",
      fr: "Un lab pratique de sécurisation réseau avec FortiGate — politique de pare-feu, contrôle du trafic et protection réseau mis en pratique.",
    },
    description: {
      en: [
        "A dedicated practice lab focused on FortiGate — configuring firewall policy, controlling traffic flow and applying core network security principles.",
        "Built to strengthen the security side of network administration, separately from the broader AJE multisite project.",
      ],
      fr: [
        "Un lab de pratique dédié à FortiGate — configuration de la politique de pare-feu, contrôle des flux et application des principes fondamentaux de sécurité réseau.",
        "Construit pour renforcer le volet sécurité de l'administration réseau, en complément du projet plus large AJE multisite.",
      ],
    },
    technologies: ["FortiGate", "Firewall Policy", "Network Security", "VLAN"],
    github: "https://github.com/daniquetresor/LAB_PRATIQUE_SECURISATION_RESEAU_AVEC_FORTIGATE.git",
    cover: {
      tone: "cyber",
      image: "/images/projects/fortigate-network-security-lab.jpg",
      imageFit: "contain",
      frame: "none",
    },
    caseStudy: {
      overview: {
        en: "A focused lab practicing network security fundamentals on FortiGate, from firewall policy to traffic control.",
        fr: "Un lab ciblé pour pratiquer les fondamentaux de la sécurité réseau sur FortiGate, de la politique de pare-feu au contrôle du trafic.",
      },
      problem: {
        en: "Network security concepts only really click once you've configured the rules yourself and watched traffic behave accordingly.",
        fr: "Les concepts de sécurité réseau ne deviennent vraiment clairs qu'une fois qu'on a configuré soi-même les règles et observé le trafic se comporter en conséquence.",
      },
      solution: {
        en: "Configured FortiGate firewall policies to control and restrict traffic, testing different rule sets against realistic network scenarios.",
        fr: "Configuration de politiques de pare-feu FortiGate pour contrôler et restreindre le trafic, en testant différents jeux de règles sur des scénarios réseau réalistes.",
      },
      technologies: {
        en: "FortiGate, firewall policy, VLAN, network traffic control.",
        fr: "FortiGate, politique de pare-feu, VLAN, contrôle du trafic réseau.",
      },
      challenges: {
        en: "Writing firewall rules precise enough to block unwanted traffic without breaking legitimate flows.",
        fr: "Écrire des règles de pare-feu assez précises pour bloquer le trafic indésirable sans casser les flux légitimes.",
      },
      result: {
        en: "A practical, repeatable lab demonstrating core FortiGate firewall configuration and network security skills.",
        fr: "Un lab pratique et reproductible démontrant les compétences de base en configuration de pare-feu FortiGate et en sécurité réseau.",
      },
    },
  },
  {
    slug: "finacces-eve-ng-simulation",
    title: "FinAccès Infrastructure Simulation",
    categories: ["network", "systems"],
    summary: {
      en: "A simulated infrastructure for a fictional financial access company, built and tested end-to-end in EVE-NG.",
      fr: "Une infrastructure simulée pour une entreprise fictive d'accès financier, construite et testée de bout en bout sous EVE-NG.",
    },
    description: {
      en: [
        "A network infrastructure simulation project modeled around a fictional company, FinAccès, built entirely in EVE-NG.",
        "Covers designing and testing a realistic company network topology, from addressing and routing to overall structure.",
      ],
      fr: [
        "Un projet de simulation d'infrastructure réseau modélisé autour d'une entreprise fictive, FinAccès, entièrement construit sous EVE-NG.",
        "Couvre la conception et le test d'une topologie réseau d'entreprise réaliste, de l'adressage au routage jusqu'à la structure globale.",
      ],
    },
    technologies: ["EVE-NG", "Network Simulation", "Routing", "Infrastructure Design"],
    github:
      "https://github.com/daniquetresor/Simualtion-d-infrastructure-de-FinAcces-avec-EVE-NG.git",
    cover: {
      tone: "network",
      image: "/images/projects/finacces-eve-ng-simulation.jpg",
      imageFit: "cover",
      frame: "none",
    },
    caseStudy: {
      overview: {
        en: "A simulated company network, built end-to-end in EVE-NG around a fictional financial access business, FinAccès.",
        fr: "Un réseau d'entreprise simulé, construit de bout en bout sous EVE-NG autour d'une entreprise fictive d'accès financier, FinAccès.",
      },
      problem: {
        en: "Designing a company network from a blank page — without a real environment to break — requires a realistic simulated scenario to practice against.",
        fr: "Concevoir un réseau d'entreprise à partir d'une page blanche — sans environnement réel à mettre à l'épreuve — demande un scénario simulé réaliste pour s'entraîner.",
      },
      solution: {
        en: "Modeled FinAccès' network topology in EVE-NG, working through addressing, routing and overall infrastructure design as if for a real organization.",
        fr: "Modélisation de la topologie réseau de FinAccès sous EVE-NG, en travaillant l'adressage, le routage et la conception globale de l'infrastructure comme pour une organisation réelle.",
      },
      technologies: {
        en: "EVE-NG, routing, IP addressing, network topology design.",
        fr: "EVE-NG, routage, adressage IP, conception de topologie réseau.",
      },
      challenges: {
        en: "Keeping the simulated topology realistic and internally consistent as its complexity grew.",
        fr: "Garder la topologie simulée réaliste et cohérente à mesure que sa complexité augmentait.",
      },
      result: {
        en: "A fully simulated, documented company network — a concrete exercise in designing infrastructure from scratch rather than just configuring an existing one.",
        fr: "Un réseau d'entreprise entièrement simulé et documenté — un exercice concret de conception d'infrastructure depuis zéro plutôt qu'une simple configuration de l'existant.",
      },
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
