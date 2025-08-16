import MyImage from "./assets/images/toga_image.jpg";
import Logo from "./assets/images/adobe-portfolio-logo.png";

const logo = {
  logo: Logo,
};
const meta = {
  logo: Logo,
  title: "Brian James Concillo",
  description:
    "I’m Brian James Concillo computer engineer _ Full stack devloper,currently working in the Philippines",
};

const introdata = {
  title: "I’m Brian James Concillo",
  animated: {
    first: "I do machine learning",
    second: "I code websites",
    third: "I develop embedded systems",
  },
  description:
    "Computer Engineer | Full Stack Developer | Currently working in the Philippines",
  your_img_url: MyImage,
};

const dataabout = {
  title: "A bit about me",
  aboutme: `I am a Computer Engineer and a Full Stack Developer. I have the passion for coding, 
    from cool websites, to embedded systems. I am also capable of creating AI and Machine 
    Learning related projects. I am currently residing in the Philippines.`,
};
const worktimeline = [
  {
    jobtitle: "Software Engineer",
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

const achievements = [
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

const services = [
  {
    title: "Frontend Web Development",
    description:
      "React, HTML, CSS, Javascript, Typescript, Tailwind CSS, QWeb, Odoo Web Library (OWL)",
  },
  {
    title: "Backend Web Development",
    description:
      "PHP, Laravel, Django, Python, Node.js, Firebase, PostgreSQL, MySQL, MongoDB",
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
    description: "n8n, Make.com, Microsoft Azure, OpenAI, Anthropic",
  },
];

const dataportfolio = [
  {
    img: "ibrgy.png",
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
    description: `Sample Layout for EcoTrail: An Eco-Friendly Tourist Attraction Booking System with React JS and Tailwind CSS.
      This project was a collaboration with Ms. Irish Paring, a UI/UX designer.`,
    role: "Sole Frontend Developer",
    link: "https://ecotrail-rowboouu.vercel.app/",
  },
  // {
  //     img: "https://picsum.photos/400/600/?grayscale",
  //     description: "The wisdom of life consists in the elimination of non-essentials.",
  //     link: "#",
  // },
];

const contactConfig = {
  YOUR_EMAIL_1: "brianjamesconcillo@gmail.com",
  YOUR_EMAIL_2: "concillo.brian08@gmail.com",
  YOUR_PHONE: "(+63) 906 634 5358",
  description:
    "I am available for freelance work. Connect with me via email, phone, or chatbot.",
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
  logo,
};
