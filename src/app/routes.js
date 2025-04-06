import React, { useState } from "react";
import withRouter from "../hooks/withRouter";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const pages = [
  { id: "home", component: <Home /> },
  { id: "about", component: <About /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "contact", component: <ContactUs /> },
];

const AnimatedStack = withRouter(() => {
  const [currentPage, setCurrentPage] = useState("home");

  const scrollToPage = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <div>
      <div className="pages-container">
        {pages.map((page) => (
          <div key={page.id} id={page.id} className="page">
            {page.component}
          </div>
        ))}
      </div>
    </div>
  );
});

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedStack />
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
