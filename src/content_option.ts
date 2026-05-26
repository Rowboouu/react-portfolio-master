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
  type: ProjectType;
  description: string;
  role: string;
  link: string;
}

export interface ContactConfig {
  YOUR_EMAIL_1: string;
  YOUR_EMAIL_2: string;
  YOUR_PHONE?: string;
  description: string;
  YOUR_SERVICE_ID: string;
  YOUR_TEMPLATE_ID: string;
  YOUR_USER_ID: string;
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
    jobtitle: "Software Engineer / IT Specialist",
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
      "React, HTML, CSS, Javascript, Typescript, Tailwind CSS, QWeb, Odoo Web Library (OWL)",
  },
  {
    title: "Backend Web Development",
    description:
      "Supabase, Firebase, PHP, Laravel, Django, Python, Node.js, PostgreSQL, MySQL, MongoDB",
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
    type: "work",
    description: `Official Website for 1000 Miles Limited, your one-stop solution for developing, manufacturing, and
    sourcing unique gift concepts from China. Founded in 2008, 1000 Miles specializes in creating retail-ready gift
    collections, custom display solutions, and packaging for retailers and businesses worldwide.`,
    role: "Sole Full Stack Developer",
    link: "https://1000miles.biz/",
  },
  {
    img: "67hub-preview.png",
    type: "work",
    description: `67 Hub is a workflow & operations dashboard built for a multi-department company (Accounting, HR, Admin,
    Amazon, OEM, IT, Brand Sales). Each department gets its own workspace for business-process templates with steps and
    SOPs, workflow runs with assignees and statuses, saved Claude.ai skill documents, and a launcher grid for internal
    tools. Cross-department views surface every workflow in flight, the org chart, and admin configuration panels.
    The stack is Next.js 16 App Router with React 19 and TypeScript 5, Tailwind v4, Supabase as the data layer,
    TipTap for rich-text workflow descriptions, and dnd-kit for drag-and-drop step editing. The production build
    integrates with Microsoft Entra ID for auth, Microsoft Graph for users/files, and Odoo for ERP flows, and exposes
    a ~3,260-line MCP server with ~50 tools so Claude.ai can author and execute workflows directly. This public
    portfolio fork stubs the auth and integrations so the UI can be explored without the corporate dependencies.`,
    role: "Full Stack Developer",
    link: "https://67hub.vercel.app",
  },
  {
    img: "packing-instruction-preview.png",
    type: "work",
    description: `Packing Instructions is an internal tool for managing product packaging specs, image sets,
    and PDF/Excel exports. Each sales order surfaces its assortments in a table or grid view; clicking an
    assortment opens an editor where images can be dropped into category slots (item pack, barcode, display,
    inner carton, master carton, shipping marks), reordered, and exported as a printable packing instruction
    PDF — or zipped for the whole sales order. The stack is React 19 + Vite 7 + TypeScript 5, Tailwind v4
    with Radix UI primitives, TanStack Query 5 + Zustand for state, React Hook Form + Zod for forms,
    and jsPDF + html2canvas + JSZip (lazy-loaded) for document generation. The production app bridges an
    Odoo ERP webhook through a NestJS + MongoDB + Supabase backend; this public portfolio fork swaps that
    out for an axios-mock layer with IndexedDB persistence so the full UI works in-browser with no backend.
    Bilingual (English + 中文) via i18next.`,
    role: "Sole Full Stack Developer",
    link: "https://packing-instruction.vercel.app",
  },
  {
    img: "ibrgy.png",
    type: "university",
    description: `iBRGY is a Barangay Management System, a computer-based software that streamlines the
    management of barangays, the smallest administrative divisions in the Philippines. For now,
    this system automates resident information management and certificate issuance tasks. Complaint
    handling, financial management, legislative tracking, and inventory management will be catered
    soon. The system helps maintain a comprehensive resident database and generate various certificates.
    Soon, it will track complaints, manage finances, monitor legislative processes, and track assets.
    The developers aim to also provide reporting and analytics features. The goal is to improve
    governance and service delivery by enhancing efficiency, transparency, and accountability at
    the barangay level. The system was made using Firebase and React JS with Tailwind CSS`,
    role: "Lead Full Stack Developer",
    link: "https://ibrgy.netlify.app/",
  },
  {
    img: "chickmeup2.png",
    type: "university",
    description: `Chick-Me-Up is an IoT-based project designed for smart poultry farming using the ESP32
      microcontroller. It integrates real-time monitoring and automation features via the
      Arduino IDE, Blynk Cloud, and Firebase to enhance poultry management efficiency.
      Features include real-time monitoring of poultry farm conditions. data logging and cloud
      storage using Firebase, remote control and automation through Blynk Cloud, and wireless
      connectivity via ESP32.`,
    role: "Lead Embedded Systems Engineer",
    link: "https://github.com/Rowboouu/Chick-Me-Up",
  },
  {
    img: "ecotrail.png",
    type: "university",
    description: `Sample Layout for EcoTrail: An Eco-Friendly Tourist Attraction Booking System with React JS and Tailwind CSS.
      This project was a collaboration with Ms. Irish Paring, a UI/UX designer.`,
    role: "Sole Frontend Developer",
    link: "https://ecotrail-rowboouu.vercel.app/",
  },
];

const contactConfig: ContactConfig = {
  YOUR_EMAIL_1: "brianjamesconcillo@gmail.com",
  YOUR_EMAIL_2: "concillo.brian08@gmail.com",
  YOUR_PHONE: "(+63) 906 634 5358",
  description:
    "I am available for freelance work. Connect with me via email, phone, or chatbot.",
  YOUR_SERVICE_ID: "service_id",
  YOUR_TEMPLATE_ID: "template_id",
  YOUR_USER_ID: "user_id",
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
