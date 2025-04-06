import MyImage from "./assets/images/cpe-challenge(1).jpg";

const logotext = "BRIAN";
const meta = {
  title: "Brian James Concillo",
  description:
    "I’m Brian James Concillo computer engineer _ Full stack devloper,currently working in the Philippines",
};

const introdata = {
  title: "I’m Brian James Concillo",
  animated: {
    first: "I love coding",
    second: "I code cool websites",
    third: "I develop embedded systems",
  },
  description:
    "Computer Engineer | Full Stack Developer | Currently working in the Philippines",
  your_img_url: MyImage,
};

const dataabout = {
  title: "A bit about my self",
  aboutme:
    "I am a Computer Engineer and a Full Stack Developer. I have a passion for coding and I love to code cool websites. I also develop embedded systems. I am currently working in the Philippines.",
};
const worktimeline = [
  {
    jobtitle: "Web Developer - Intern (Full Stack)",
    where: "Prince Technologies Corporation",
    date: "2025",
    reference: "John Doe",
  },
  {
    jobtitle: "Committee on Web Development",
    where: "University of Science and Technology of Southern Philippines",
    date: "2023-Present",
    reference: "John Doe",
  },
  {
    jobtitle: "Customer Service Representative",
    where: "Concentrix Inc.",
    date: "2021",
    reference: "John Doe",
  },
];

const achievements = [
  {
    title: "National CpE Challenge",
    description:
      "C-Programming Challenge Participant (2023), 4th Placer (2024), TBD (2025)",
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

const services = [
  {
    title: "Frontend Development",
    description: "React, HTML, CSS, Javascript, Typescript",
  },
  {
    title: "Backend Development",
    description: "Laravel, Firebase",
  },
  {
    title: "Embedded Systems Development",
    description: "Arduino, Raspberry Pi, ESP32",
  },
];

const dataportfolio = [
  {
    img: "ibrgy.png",
    description:
      "A computer-based software that streamlines the management of barangays, the smallest administrative divisions in the Philippines",
    link: "https://ibrgy.netlify.app/",
  },
  {
    img: "chickmeup2.png",
    description:
      "An IoT-based project for Smart Poultry Farms with ESP32, Blynk Cloud, and Firebase",
    link: "https://github.com/Rowboouu/Chick-Me-Up",
  },
  {
    img: "ecotrail.png",
    description:
      "Sample Layout for EcoTrail: An Eco-Friendly Tourist Attraction Booking System with React JS",
    link: "https://ecotrail-rowboouu.vercel.app/",
  },
  // {
  //     img: "https://picsum.photos/400/600/?grayscale",
  //     description: "The wisdom of life consists in the elimination of non-essentials.",
  //     link: "#",
  // },
];

const contactConfig = {
  YOUR_EMAIL: "brianjamesconcillo@gmail.com",
  YOUR_FONE: "(+63) 906 634 5358",
  description:
    "I am available for freelance work. Connect with me via email or phone.",
  // creat an emailjs.com account
  // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
  YOUR_SERVICE_ID: "service_id",
  YOUR_TEMPLATE_ID: "template_id",
  YOUR_USER_ID: "user_id",
};

const socialprofils = {
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
  logotext,
};
