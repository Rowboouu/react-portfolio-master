const MyImage = "/images/toga_image.jpg";
const Logo = "/images/adobe-portfolio-logo.png";

export interface Meta {
  logo: string;
  title: string;
  description: string;
}

export interface WorkTimelineItem {
  jobtitle: string;
  where: string;
  date: string;
  reference: string;
  link: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export interface Service {
  title: string;
  description: string;
}

export type ProjectType = "university" | "work" | "hobby";

export interface PortfolioItem {
  img: string;
  title: string;
  type: ProjectType;
  /** One or two sentences: what the project is. Detail belongs in `highlights`. */
  description: string;
  /** Scannable bullets — features, stack, notable engineering. */
  highlights: string[];
  role: string;
  link: string;
  /**
   * For real work projects whose public link is a sanitized fork: what was
   * stripped out to make it shareable. Surfaced in the project modal and given
   * its own line in the chat agent's knowledge base, so both make clear the
   * work is genuine production software and the demo is a stripped copy.
   */
  portfolioSafe?: string;
  /**
   * The name the project goes by internally, where the public fork was renamed.
   * Lets the agent connect the two if a visitor knows it by its real name.
   */
  originalName?: string;
}

export interface ContactConfig {
  YOUR_EMAIL_1: string;
  YOUR_EMAIL_2: string;
  YOUR_PHONE?: string;
  description: string;
}

export interface SocialProfiles {
  github?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  twitch?: string;
  snapchat?: string;
  tiktok?: string;
  [key: string]: string | undefined;
}

const logo = {
  logo: Logo,
};

const meta: Meta = {
  logo: Logo,
  title: "Brian James Concillo",
  description:
    "I’m Brian James Concillo computer engineer _ Full stack devloper,currently working in the Philippines",
};

const introdata = {
  title: "I’m Brian James Concillo",
  animated: [
    "I do machine learning",
    "I code websites",
    "I develop embedded systems",
    "I build automation workflows",
    "I create AI solutions",
  ],
  description:
    "Computer Engineer | Full Stack Developer | Currently working in the Philippines",
  your_img_url: MyImage,
};

const dataabout = {
  title: "A bit about me",
  aboutme: `I am a Computer Engineer and a Full Stack Developer. I have the passion for coding,
    from cool websites, to embedded systems. I am also capable of creating AI and Machine
    Learning related projects, as well as workflow automation solutions. I am currently residing in the Philippines.`,
};

const worktimeline: WorkTimelineItem[] = [
  {
    jobtitle: "Software Developer",
    where: "1000 Miles Limited",
    date: "2025-Present",
    reference: "Kristin Jariol",
    link: "https://www.facebook.com/kjariol",
  },
  {
    jobtitle: "Web Developer - Intern (Full Stack)",
    where: "Prince Technologies Corporation",
    date: "2025",
    reference: "Engr. Kevin Pallado",
    link: "https://www.facebook.com/tooezzzzz",
  },
  {
    jobtitle: "Committee on Web Development",
    where: "University of Science and Technology of Southern Philippines",
    date: "2023-2025",
    reference: "Engr. Marvin Tagolimot",
    link: "https://www.facebook.com/diffident016",
  },
  {
    jobtitle: "Customer Service Representative",
    where: "Concentrix Inc.",
    date: "2021",
    reference: "Maria Patricia Nonoy",
    link: "mailto:maria.nonoy@concentrix.com",
  },
];

const achievements: Achievement[] = [
  {
    title: "National CpE Challenge",
    description:
      "C-Programming Challenge Participant (2023), 4th Placer (2024), Participant (2025)",
    date: "2023-2025",
  },
  {
    title: "Regional CpE Challenge",
    description: "C-Programming Challenge Champion",
    date: "2023-2025",
  },
  {
    title: "Thailand International Mathematical Olympiad",
    description:
      "Bronze Medalist in the Heat Round, Did not participate in the Final Round due to COVID-19",
    date: "2020",
  },
  {
    title: "MTAP DepEd Math Challenge",
    description:
      "Consistent Top 1-2 in the Division Level, 3rd Place in the Regional Level (2019)",
    date: "2012-2015, 2017-2019",
  },
];

const services: Service[] = [
  {
    title: "Frontend Web Development",
    description:
      "React, Next.js, HTML, CSS, Javascript, Typescript, Tailwind CSS, QWeb, Odoo Web Library (OWL)",
  },
  {
    title: "Backend Web Development and Deployment",
    description:
      "Supabase, Next.js, Vercel, Firebase, PHP, Laravel, Django, Python, Node.js, PostgreSQL, MySQL, MongoDB",
  },
  {
    title: "Embedded Systems Development",
    description:
      "Arduino, Raspberry Pi, Raspberry Pi Pico, ESP32, C++, MicroPython",
  },
  {
    title: "Machine Learning",
    description: "Python, Tensorflow, Keras, Scikit-learn, OpenCV, PyTorch",
  },
  {
    title: "Workflow Automation & AI Integration",
    description: "n8n, Make.com, Microsoft Azure/Entra, OpenAI, Anthropic",
  },
];

const dataportfolio: PortfolioItem[] = [
  {
    img: "1000miles-biz.png",
    title: "1000 Miles",
    type: "work",
    description: `The official website for 1000 Miles Limited, a gift design and sourcing company founded in 2008.`,
    highlights: [
      "A one-stop solution for developing, manufacturing, and sourcing unique gift concepts from China.",
      "Specialises in retail-ready gift collections, custom display solutions, and packaging.",
      "Serves retailers and businesses worldwide.",
    ],
    role: "Sole Full Stack Developer",
    link: "https://1000miles.biz/",
  },
  {
    img: "67hub-preview.png",
    title: "67 Hub",
    type: "work",
    description: `A workflow and operations dashboard for a multi-department company — Accounting, HR, Admin, Amazon,
    OEM, IT, and Brand Sales.`,
    highlights: [
      "Each department gets its own workspace for business-process templates with steps and SOPs.",
      "Workflow runs track assignees and statuses, alongside saved Claude.ai skill documents and a launcher grid for internal tools.",
      "Cross-department views surface every workflow in flight, the org chart, and admin configuration panels.",
      "Exposes a ~3,260-line MCP server with ~50 tools, so Claude.ai can author and execute workflows directly.",
      "Built on Next.js 16 App Router with React 19, TypeScript 5, Tailwind v4, and Supabase as the data layer.",
      "TipTap powers rich-text workflow descriptions; dnd-kit handles drag-and-drop step editing.",
      "The production build integrates Microsoft Entra ID for auth, Microsoft Graph for users and files, and Odoo for ERP flows.",
    ],
    role: "Full Stack Developer",
    link: "https://67hub.vercel.app",
    originalName: "1000MILES Hub",
    portfolioSafe: `This is a real internal tool built for 1000 Miles Limited and used in production — not a demo
    project. It runs internally as "1000MILES Hub"; the public fork was renamed to 67 Hub and deliberately
    sanitized: Microsoft Entra ID auth, Microsoft Graph, and the Odoo ERP integration are all stubbed out, and no
    company data, credentials, or private configuration ship with it. That keeps the full UI explorable without
    exposing anything belonging to the company.`,
  },
  {
    img: "packing-instruction-preview.png",
    title: "Packing Instructions",
    type: "work",
    description: `An internal tool for managing product packaging specs, image sets, and PDF/Excel exports.`,
    highlights: [
      "Each sales order surfaces its assortments in a table or grid view.",
      "Opening an assortment gives an editor where images drop into category slots — item pack, barcode, display, inner carton, master carton, shipping marks — and can be reordered.",
      "Exports a printable packing instruction PDF, or a zip covering the whole sales order.",
      "Built on React 19 + Vite 7 + TypeScript 5, with Tailwind v4 and Radix UI primitives.",
      "TanStack Query 5 + Zustand for state; React Hook Form + Zod for forms.",
      "jsPDF, html2canvas, and JSZip are lazy-loaded to keep document generation off the initial bundle.",
      "The production app bridges an Odoo ERP webhook through a NestJS + MongoDB + Supabase backend.",
      "Bilingual (English + 中文) via i18next.",
    ],
    role: "Sole Full Stack Developer",
    link: "https://packing-instruction.vercel.app",
    portfolioSafe: `This is a real internal tool built for 1000 Miles Limited and used in production — not a demo
    project. The public link is a deliberately sanitized fork: the Odoo ERP webhook and the NestJS + MongoDB +
    Supabase backend are replaced with an axios-mock layer backed by IndexedDB, so the whole UI runs in the browser
    with no company data and no access to the company's systems.`,
  },
  {
    img: "ibrgy.png",
    title: "iBRGY",
    type: "university",
    description: `A Barangay Management System that streamlines the administration of barangays, the smallest
    administrative divisions in the Philippines.`,
    highlights: [
      "Automates resident information management and certificate issuance.",
      "Maintains a comprehensive resident database and generates various certificates.",
      "Planned: complaint handling, financial management, legislative tracking, and inventory/asset management.",
      "Planned: reporting and analytics features.",
      "Aims to improve governance and service delivery by increasing efficiency, transparency, and accountability at the barangay level.",
      "Built with Firebase and React JS with Tailwind CSS.",
    ],
    role: "Lead Full Stack Developer",
    link: "https://ibrgy.netlify.app/",
  },
  {
    img: "chickmeup2.png",
    title: "Chick-Me-Up",
    type: "university",
    description: `An IoT project for smart poultry farming built on the ESP32 microcontroller, combining real-time
    monitoring with automation to make poultry management more efficient.`,
    highlights: [
      "Real-time monitoring of poultry farm conditions.",
      "Data logging and cloud storage using Firebase.",
      "Remote control and automation through Blynk Cloud.",
      "Wireless connectivity via the ESP32.",
      "Developed with the Arduino IDE, Blynk Cloud, and Firebase.",
    ],
    role: "Lead Embedded Systems Engineer",
    link: "https://github.com/Rowboouu/Chick-Me-Up",
  },
  {
    img: "ecotrail.png",
    title: "EcoTrail",
    type: "university",
    description: `A sample layout for EcoTrail, an eco-friendly tourist attraction booking system.`,
    highlights: [
      "Built with React JS and Tailwind CSS.",
      "A collaboration with Ms. Irish Paring, a UI/UX designer.",
    ],
    role: "Sole Frontend Developer",
    link: "https://ecotrail-rowboouu.vercel.app/",
  },
  {
    img: "chess-gauntlet-preview.png",
    title: "Chess Gauntlet",
    type: "hobby",
    description: `Rowboouu's Chess Gauntlet is a chess web app where you climb a ladder of progressively stronger
    bots, earning a real Elo rating on the way up.`,
    highlights: [
      "10 fixed-strength rungs from 500 to 2400 Elo — beat one to unlock the next.",
      "Earn a standard Elo rating and compete on a global leaderboard.",
      "Free Play mode picks any rung as a one-off rated game.",
      "Saved games let you leave mid-match and resume the exact position later.",
      "Elo is computed server-side so the leaderboard can't be faked: RLS and a trigger stop clients writing rating columns directly.",
      "The only path that changes Elo is a service-role-only RPC, run after the server re-derives the game result from the PGN.",
      "Built on Next.js (App Router) with Tailwind CSS and Supabase (Postgres + Auth) as the data layer.",
      "chess.js and react-chessboard drive the board; Stockfish compiled to WASM runs in a Web Worker as the opponent engine.",
    ],
    role: "Sole Full Stack Developer",
    link: "https://chess-gauntlet.vercel.app/",
  },
];

const contactConfig: ContactConfig = {
  YOUR_EMAIL_1: "brianjamesconcillo@gmail.com",
  YOUR_EMAIL_2: "concillo.brian08@gmail.com",
  YOUR_PHONE: "(+63) 906 634 5358",
  description:
    "I am available for freelance work. Connect with me via email, phone, or the chat assistant.",
};

const socialprofils: SocialProfiles = {
  github: "https://github.com/Rowboouu",
  facebook: "https://www.facebook.com/brianjames.concillo/",
  linkedin: "https://www.linkedin.com/in/brian-james-concillo-859542334/",
};

export {
  meta,
  dataabout,
  dataportfolio,
  worktimeline,
  achievements,
  services,
  introdata,
  contactConfig,
  socialprofils,
  logo,
};
