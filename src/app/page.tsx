import { Home } from "../pages/home";
import { About } from "../pages/about";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { Socialicons } from "../components/socialicons";

const sections = [
  { id: "home", component: <Home /> },
  { id: "about", component: <About /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "contact", component: <ContactUs /> },
];

export default function Page() {
  return (
    <div className="s_c">
      <div className="pages-container">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="page">
            {section.component}
          </div>
        ))}
      </div>
      <Socialicons />
    </div>
  );
}
